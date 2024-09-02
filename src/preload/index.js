import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', {
      ipcRenderer: {
        send: (channel, data) => {
          // 只允许特定的通道
          const validChannels = ['minimize-window', 'maximize-window', 'close-window']
          if (validChannels.includes(channel)) {
            console.log('123:', channel, data)
            ipcRenderer.send(channel, data)
          }
        }
      },
      booksnamesaveJson: (data) => ipcRenderer.invoke('booksname-save-json', data),
      booksnamereadJson: () => ipcRenderer.invoke('booksname-read-json'),
      notesnamesaveJson: (data) => ipcRenderer.invoke('notesname-save-json', data),
      notesnamereadJson: () => ipcRenderer.invoke('notesname-read-json')
    })
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
