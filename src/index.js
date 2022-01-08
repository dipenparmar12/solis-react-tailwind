import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import App from './App'
import reportWebVitals from './reportWebVitals'
import AuthProvider from './context/AuthContext'
import LayoutProvider from './context/LayoutContext'
import AppContextProvider from './context/AppContext'

import 'react-toastify/dist/ReactToastify.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-responsive-modal/styles.css'
import './index.scss'

console.info('index.js::[12] env', process.env.NODE_ENV)

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <LayoutProvider>
        <BrowserRouter>
          <AuthProvider>
            <App />
            <ToastContainer />
          </AuthProvider>
        </BrowserRouter>
      </LayoutProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
