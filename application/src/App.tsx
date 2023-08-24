import React from 'react'
import './App.scss'
import HomeComponent from "./components/home/home.component"
import {ElectronBusService} from "./helpers/electron-bus.service"

export const electronBusObject = new ElectronBusService()
electronBusObject.electron = window.require('electron')
electronBusObject.ipcRendererElectron = electronBusObject.electron.ipcRenderer

function App(): JSX.Element {
  return (
    <div className="App">
      <HomeComponent></HomeComponent>
    </div>
  )
}

export default App
