const { app, BrowserWindow } = require('electron');

describe('Application', () => {
  let window;

  beforeEach(async () => {
    window = new BrowserWindow({
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false
      }
    });
  });

  afterEach(() => {
    if (window) {
      window.destroy();
    }
  });

  test('should create window', () => {
    expect(window).toBeDefined();
  });

  test('should load index.html', async () => {
    await window.loadFile('src/index.html');
    expect(window.webContents.getURL()).toContain('index.html');
  });
});