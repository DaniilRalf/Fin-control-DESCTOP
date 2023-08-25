import React from 'react'
import './App.scss'
import HomeComponent from "./components/home/home.component"
import {ElectronBusService} from "./helpers/electron-bus.service"
import HeaderComponent from "./components/header/header.component";

export const electronBusObject = new ElectronBusService()
electronBusObject.electron = window.require('electron')
electronBusObject.ipcRendererElectron = electronBusObject.electron.ipcRenderer

function App(): JSX.Element {
  return (
    <div className="App">
        <HeaderComponent></HeaderComponent>
      <HomeComponent></HomeComponent>
    </div>
  )
}

export default App
