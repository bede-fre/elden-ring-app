import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import EldenRingApp from './App';
import reportWebVitals from './reportWebVitals';
import { colorsVar } from './app/services/styles/variables';

const root = ReactDOM.createRoot(document.getElementById('root'));
const body = document.getElementById('body');

body.style.backgroundColor = colorsVar.backgroundColor;
body.style.color = colorsVar.color;

root.render(
  <React.StrictMode>
    <EldenRingApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
