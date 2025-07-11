// Jest setup file
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Mock Electron
jest.mock('electron', () => ({
  app: {
    quit: jest.fn(),
    on: jest.fn(),
    whenReady: jest.fn(() => Promise.resolve()),
    getPath: jest.fn(() => '/tmp')
  },
  BrowserWindow: jest.fn().mockImplementation(() => ({
    loadFile: jest.fn(() => Promise.resolve()),
    on: jest.fn(),
    show: jest.fn(),
    destroy: jest.fn(),
    webContents: {
      getURL: jest.fn(() => 'file:///src/index.html'),
      on: jest.fn()
    }
  })),
  ipcMain: {
    on: jest.fn(),
    handle: jest.fn()
  },
  Menu: {
    setApplicationMenu: jest.fn()
  },
  Tray: jest.fn().mockImplementation(() => ({
    setToolTip: jest.fn(),
    setContextMenu: jest.fn(),
    on: jest.fn()
  }))
}));