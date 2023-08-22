import React from 'react'
import './App.scss'

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

function App() {

  // console.log('===========================')
  // console.log(ipcRenderer)
  // console.log('===========================')

  return (
    <div className="App">
      app-start
    </div>
  )
}

export default App
