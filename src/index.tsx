import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

let startApp = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ); 
}


if(!(window as any).cordova) {
  startApp()
} else {
  document.addEventListener('deviceready', startApp, false)
}