import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // use  StrictMode in only diff model to re-render every thing twice to try catch any errors 
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
