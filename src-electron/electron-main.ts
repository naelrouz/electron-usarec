import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import path from 'path';
import os from 'os';

import { menubar } from 'menubar';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) {}

const icon = path.join(__dirname, '../../src-electron/icons/icon-16x16.png');
console.log('>>> icon: ', icon);

const mb = menubar({
  index: process.env.APP_URL + '/#/mb',
  icon,
  browserWindow: {
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  },
});

mb.on('after-create-window', () => {
  if (!mb?.window) {
    throw new Error();
  }
  mb.window.openDevTools();
});

mb.on('ready', () => {
  console.log('app is ready');

  // your app code here

  // mb.tray.on('right-click', () => app.quit());
});

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});

ipcMain.handle('GET_USER_INFO', () => os.userInfo());
