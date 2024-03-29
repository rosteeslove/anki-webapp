import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './AppWrapper';
import reportWebVitals from './reportWebVitals';

// it could be <App/> wrapped in <React.StrictMode> but AppWrapper
// facilitates contexts
ReactDOM.render(
  <React.StrictMode>
      <AppWrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
