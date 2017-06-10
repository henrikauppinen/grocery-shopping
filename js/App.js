import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import {
  grey as primary,
  amber as accent
} from 'material-ui/styles/colors'

import ShoppingList from './ShoppingList'
import ShoppingListEditor from './ShoppingListEditor'

const theme = createMuiTheme({
  palette: createPalette({
    primary,
    accent
  })
})

class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Route exact path='/' render={() => <ShoppingList />} />
            <Route path='/edit' render={() => <ShoppingListEditor />} />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
