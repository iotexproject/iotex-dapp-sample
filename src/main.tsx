import ReactDOM from 'react-dom';
import React from 'react';
import App from './index';
import { Buffer } from 'buffer';
//@ts-ignore
window.Buffer = Buffer;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
