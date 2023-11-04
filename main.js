// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('node:path')
const fs = require("fs");

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })



  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  mainWindow.loadURL("http://localhost:3000").then(() => {
    const args = process.argv.slice(1);
    console.log(1, args)
    // 查找文件路径参数
    const filePathArgIndex = args.findIndex(arg => {
      // 判断参数是否是文件路径（可以根据具体需求进行判断）
      return fs.existsSync(arg) && fs.statSync(arg).isFile();
    });

    if (filePathArgIndex !== -1) {
      // 找到文件路径参数
      const filePath = args[filePathArgIndex];

      // 使用fs模块读取文件内容
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.error('读取文件出错', err);
        } else {
          // 在Electron窗口中显示文件内容
          mainWindow.webContents.send('file-content', data);
          console.log(2)
        }
      });
    }
  });

  // Open the DevTools.
   mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
