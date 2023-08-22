import React from 'react';
import logo from './logo.svg';
import './App.scss';

const electron = window.require('electron');
const ipcRenderer  = electron.ipcRenderer;

function App() {

  console.log('===========================')
  console.log(ipcRenderer)
  console.log('===========================')

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          as
          dfasdfasdfaasdfa
          sdfasdf
          asd
          fa
          sd
          fas
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
