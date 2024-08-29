import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 670,
    height: 500,
    minWidth: 670,
    minHeight: 500,
    // show: false,
    frame: false, // 隐藏窗口的边框和标题栏
    autoHideMenuBar: true,
    alwaysOnTop: false, //设置窗口不一直在最顶层
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  // 最小化
  ipcMain.on('minimize-window', function () {
    mainWindow.minimize()
  })
  // 全屏
  ipcMain.on('maximize-window', function (el, data) {
    if (data) {
      mainWindow.maximize()
    } else {
      mainWindow.restore()
    }
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // const mainWindow = remote.getCurrentWindow()
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  ipcMain.on('ping', () => console.log('pong'))
  // 退出程序
  ipcMain.on('close-window', function () {
    app.quit()
  })

  // 退出全屏
  ipcMain.on('unmaximize-window', function () {
    app.setFullScreen(false)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
