/**
 * The preload script runs before. It has access to web APIs
 * as well as Electron's renderer process modules and some
 * polyfilled Node.js functions.
 *
 * https://www.electronjs.org/docs/latest/tutorial/sandbox
 */
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})

const { ipcRenderer, contextBridge } = require('electron');

document.addEventListener('DOMContentLoaded', () => {

  // contextBridge.exposeInMainWorld('electronAPI', {
  //   handleCounter: (callback) => ipcRenderer.on('update-counter', callback)
  // })
  // 在页面加载后设置事件监听器

  ipcRenderer.on('file-content', (event, data) => {
    // 处理从主进程发送的事件数据
    console.log('接收到file-content事件', data);
    window.data = data;
    // 在这里执行你的处理逻辑
  });

  // 在这里执行其他初始化操作
});

contextBridge.exposeInMainWorld('electronAPI', {
  handleCounter: (callback) => ipcRenderer.on('file-content', callback)
})