const {app, BrowserWindow} = require('electron');

let mainWindow;

function createWindow() {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 495,
        useContentSize: true,
        resizable: true
    });

    // 加载显示页面
    mainWindow.loadFile('./views/index.html');

    // 开启 DevTools.
    // mainWindow.webContents.openDevTools()

    // 等待渲染完毕在进行显示
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });

    // 监听窗口关闭事件
    mainWindow.on('closed', function () {
        /*
        * 取消对窗口对象的引用，如果应用程序支持多个窗口，通常将窗口存储在数组中，此时应该删除相应的元素
        * */
        mainWindow = null
    });

    // 监听窗口分辨率变化
    mainWindow.on('resize', () => {

    });
}

/*
* 初始化完成加载浏览器窗口
* */
app.on('ready', createWindow);

/*
* 当所有窗口关闭
* */
app.on('window-all-closed', function () {
    // 在OSX上，应用程序和菜单栏通常保持活跃，直到用户用CMD+Q明确退出
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // 在OS X上，当点击图标时，在应用程序中重新创建窗口是常见的，并且没有其他窗口打开。.
    if (mainWindow === null) {
        createWindow()
    }
});
