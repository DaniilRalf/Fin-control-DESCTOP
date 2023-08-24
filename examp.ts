// example bus electron -> application

// // // main.js

// /** after init application get cache data in app */
// const dataCacheIncome = electronStore.get(CacheEventEnum.Income)
// if (dataCacheIncome) {
//     mainWindow.webContents.send(CacheEventEnum.Income, dataCacheIncome);
// }

// // // app

// electronBusObject.ipcRendererElectron.on('income', (_event: any, data: IncomeInterface[]) => {
//     if (data && data.length > 0) {
//         setIncomeList(data)
//         dispatch(setIncomeCache({data: data}))
//     }
// })


