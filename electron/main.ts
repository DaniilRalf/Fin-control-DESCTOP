const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const url = require('url')
const {ElectronEventsEnum, CacheEventEnum} = require("common/dist")
const ElectronStore = require('electron-store')
// const preloadApp = require('./preload')

const electronStore = new ElectronStore()

const createWindow = () => {
    /** Create the browser window */
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: 'favicon.ico',
        // frame: false,
        // transparent: true,
        autoHideMenuBar: true, /** auto hidden settings-menu from top */
        webPreferences: {
            // preload: preloadApp(),
            nodeIntegration: true,
            contextIsolation: false, /** отключаем изоляцию от глобального обьекта window, теперь у него будет поле 'electron'*/
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
    app.on('activate', () => {
        /** В Mac-OS обычно повторно создается окно в приложении, когда щелкается значок dock, а другие открытые окна отсутствуют */
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })


    /** events */
    ipcMain.handle(ElectronEventsEnum.CacheIncomeSave, async (_event: any, arg: any) => {
        electronStore.set(CacheEventEnum.Income, arg);
    })
    ipcMain.handle(ElectronEventsEnum.CacheIncomeGet, async (_event: any, _arg: any) => {
        return electronStore.get(CacheEventEnum.Income)
    })

    ipcMain.handle(ElectronEventsEnum.CacheOutcomeSave, async (_event: any, arg: any) => {
        electronStore.set(CacheEventEnum.Outcome, arg);
    })
    ipcMain.handle(ElectronEventsEnum.CacheOutcomeGet, async (_event: any, _arg: any) => {
        return electronStore.get(CacheEventEnum.Outcome)
    })
})


/** Завершите работу, когда все окна будут закрыты, за исключением macOS.
 * Там приложения и их строка меню обычно остаются активными до тех пор, пока пользователь явно не завершит работу с помощью Cmd + Q
 * */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
