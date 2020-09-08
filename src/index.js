import React from 'react'
import ReactDOM from 'react-dom'
import { rem } from '@yolkpie/utils'
import { handleImgError } from '@/utils/tools'
import App from './App'
import './styles/base.scss'

rem()
handleImgError()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
