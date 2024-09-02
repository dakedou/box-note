import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
const fs = require('fs')
const path = require('path')
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
    // transparent: true, // 设置窗口背景透明
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

  //刷新
  globalShortcut.register('F5', () => {
    mainWindow.webContents.reload()
  })

  globalShortcut.register('CommandOrControl+R', () => {
    mainWindow.webContents.reload()
  })
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
//存放json数据 笔记本
ipcMain.handle('booksname-save-json', async (event, data) => {
  const dir = 'D:/boxNote' // 目标文件夹
  const filePath = path.join(dir, 'booksName.json') // 文件路径
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
  console.log('JSON 数据已保存到', filePath)
})
// 处理读取
ipcMain.handle('booksname-read-json', async () => {
  const filePath = 'D:/boxNote/booksName.json' // JSON 文件路径
  try {
    const data = fs.readFileSync(filePath, 'utf-8') // 读取文件
    const jsonData = JSON.parse(data) // 解析 JSON 数据
    return jsonData // 返回 bookList 数据
  } catch (error) {
    console.error('读取 JSON 文件时出错:', error)
    throw error // 抛出错误以便在渲染进程中处理
  }
})
//存放json数据 笔记本
ipcMain.handle('notesname-save-json', async (event, data) => {
  const dir = 'D:/boxNote' // 目标文件夹
  const filePath = path.join(dir, 'notesName.json') // 文件路径
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
  console.log('JSON 数据已保存到', filePath)
})
// 处理读取
ipcMain.handle('notesname-read-json', async () => {
  const filePath = 'D:/boxNote/notesName.json' // JSON 文件路径
  try {
    const data = fs.readFileSync(filePath, 'utf-8') // 读取文件
    const jsonData = JSON.parse(data) // 解析 JSON 数据
    return jsonData // 返回 bookList 数据
  } catch (error) {
    console.error('读取 JSON 文件时出错:', error)
    throw error // 抛出错误以便在渲染进程中处理
  }
})
