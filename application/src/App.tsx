import React from 'react'
import './App.scss'
import HomeComponent from "./components/home/home.component"
import {ElectronBus} from "./helpers/electron-bus"

export const electronBusObject = new ElectronBus()
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
