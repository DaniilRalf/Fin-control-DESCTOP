import React from 'react'
import './App.scss'
import HomeComponent from "./components/home/home.component"
import {ElectronBus} from "./helpers/electron-bus"
import {ElectronEventsEnum} from "common/dist";

export const electronBusObject = new ElectronBus()
electronBusObject.electron = window.require('electron')
electronBusObject.ipcRendererElectron = electronBusObject.electron.ipcRenderer

function App(): JSX.Element {

  console.log('===========================')
  console.log(electronBusObject.ipcRendererElectron)
  console.log('===========================')


  const test = async (): Promise<void> => {
    await electronBusObject.ipcRendererElectron.invoke(ElectronEventsEnum.IncomeSave, 'asdasd', 'asdasd')
  }
  test().then()



  return (
    <div className="App">
      <HomeComponent></HomeComponent>
    </div>
  )
}

export default App
