const { app, BrowserWindow, Menu, Tray, ipcMain, screen, globalShortcut } = require('electron');
const path = require('path');
const Store = require('electron-store');

const store = new Store();
let mainWindow;
let tray;
let overlayWindow;
let isEnabled = true;
let currentMode = 'normal';

const eyeProtectionModes = {
  normal: { temperature: 6500, brightness: 100 },
  office: { temperature: 5000, brightness: 95 },
  game: { temperature: 6000, brightness: 90 },
  night: { temperature: 3000, brightness: 80 },
  reading: { temperature: 4000, brightness: 85 }
};

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, '../assets/icons/icon.png'),
    show: false,
    skipTaskbar: true
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  mainWindow.on('close', (event) => {
    event.preventDefault();
    mainWindow.hide();
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

function createOverlayWindow() {
  const displays = screen.getAllDisplays();
  
  displays.forEach((display, index) => {
    const overlay = new BrowserWindow({
      x: display.bounds.x,
      y: display.bounds.y,
      width: display.bounds.width,
      height: display.bounds.height,
      transparent: true,
      frame: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      resizable: false,
      movable: false,
      closable: false,
      focusable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    overlay.setIgnoreMouseEvents(true);
    overlay.loadFile(path.join(__dirname, 'overlay.html'));
    
    if (index === 0) {
      overlayWindow = overlay;
    }
  });
}

function createTray() {
  tray = new Tray(path.join(__dirname, '../assets/icons/tray.png'));
  
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show/Hide',
      click: () => {
        if (mainWindow.isVisible()) {
          mainWindow.hide();
        } else {
          mainWindow.show();
        }
      }
    },
    {
      label: 'Enable/Disable',
      click: () => {
        isEnabled = !isEnabled;
        updateOverlay();
        mainWindow.webContents.send('status-changed', isEnabled);
      }
    },
    { type: 'separator' },
    {
      label: 'Normal Mode',
      click: () => setMode('normal')
    },
    {
      label: 'Office Mode',
      click: () => setMode('office')
    },
    {
      label: 'Game Mode',
      click: () => setMode('game')
    },
    {
      label: 'Night Mode',
      click: () => setMode('night')
    },
    {
      label: 'Reading Mode',
      click: () => setMode('reading')
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip('GoodRest Eye Protection');
}

function setMode(mode) {
  currentMode = mode;
  store.set('currentMode', mode);
  updateOverlay();
  if (mainWindow) {
    mainWindow.webContents.send('mode-changed', mode);
  }
}

function updateOverlay() {
  if (overlayWindow) {
    const mode = eyeProtectionModes[currentMode];
    overlayWindow.webContents.send('update-filter', {
      enabled: isEnabled,
      temperature: mode.temperature,
      brightness: mode.brightness / 100
    });
  }
}

function registerGlobalShortcuts() {
  globalShortcut.register('CommandOrControl+Alt+E', () => {
    isEnabled = !isEnabled;
    updateOverlay();
    if (mainWindow) {
      mainWindow.webContents.send('status-changed', isEnabled);
    }
  });

  globalShortcut.register('CommandOrControl+Alt+M', () => {
    const modes = Object.keys(eyeProtectionModes);
    const currentIndex = modes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setMode(modes[nextIndex]);
  });
}

app.whenReady().then(() => {
  createMainWindow();
  createOverlayWindow();
  createTray();
  registerGlobalShortcuts();

  const savedMode = store.get('currentMode', 'normal');
  setMode(savedMode);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

ipcMain.handle('get-modes', () => {
  return eyeProtectionModes;
});

ipcMain.handle('get-current-mode', () => {
  return currentMode;
});

ipcMain.handle('set-mode', (event, mode) => {
  setMode(mode);
});

ipcMain.handle('toggle-enabled', () => {
  isEnabled = !isEnabled;
  updateOverlay();
  return isEnabled;
});

ipcMain.handle('get-enabled', () => {
  return isEnabled;
});

ipcMain.handle('set-custom-settings', (event, settings) => {
  eyeProtectionModes.custom = settings;
  store.set('customSettings', settings);
  if (currentMode === 'custom') {
    updateOverlay();
  }
});

ipcMain.handle('start-pomodoro', (event, workTime, breakTime) => {
  store.set('pomodoroSettings', { workTime, breakTime });
});

ipcMain.handle('show-break-screen', (event, duration) => {
  const displays = screen.getAllDisplays();
  displays.forEach(display => {
    const overlay = new BrowserWindow({
      x: display.bounds.x,
      y: display.bounds.y,
      width: display.bounds.width,
      height: display.bounds.height,
      transparent: true,
      frame: false,
      alwaysOnTop: true,
      skipTaskbar: true,
      resizable: false,
      movable: false,
      closable: false,
      focusable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });

    overlay.setIgnoreMouseEvents(true);
    overlay.loadFile(path.join(__dirname, 'overlay.html'));
    overlay.webContents.once('dom-ready', () => {
      overlay.webContents.send('show-break', duration);
    });
  });
});