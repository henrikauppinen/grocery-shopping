import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './state/store'

import App from './App'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'))
