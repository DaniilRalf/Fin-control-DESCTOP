// const preloadApp = require('./preload')
const {app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require ('url')
const {ElectronEventsEnum} = require("common/dist");


const createWindow = () => {
    /** Create the browser window */
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true, /** auto hidden settings-menu from top */
        webPreferences: {
            // preload: preloadApp(),
            nodeIntegration: true,
            contextIsolation: false /** отключаем изоляцию от глобального обьекта window, теперь у него будет поле 'electron'*/
        }
    })

    /** Load the index.html or the local host */
    const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, '../application/build/index.html'),
            protocol: 'file:',
            slashes: true
        })
    mainWindow.loadURL(startUrl).then()
}


/** Этот метод будет вызван, когда Electron завершит инициализацию и будет готов к созданию окон браузера.
 * Некоторые API-интерфейсы могут быть использованы только после наступления этого события.
 * */
app.whenReady().then(() => {

    createWindow()

    /** events */
    ipcMain.handle(ElectronEventsEnum.IncomeSave, async (event: any, ...args: any) => {
        console.log('=============================')
        console.log(event)
        console.log(args)
        console.log('=============================')
    })

    app.on('activate', () => {
        /** В Mac-OS обычно повторно создается окно в приложении, когда щелкается значок dock, а другие открытые окна отсутствуют */
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


/** Завершите работу, когда все окна будут закрыты, за исключением macOS.
 * Там приложения и их строка меню обычно остаются активными до тех пор, пока пользователь явно не завершит работу с помощью Cmd + Q
 * */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
