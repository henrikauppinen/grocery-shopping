import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ShoppingList from './ShoppingList'
import ShoppingListEditor from './ShoppingListEditor'

class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route exact path='/' render={() => <ShoppingList />} />
            <Route path='/edit' render={() => <ShoppingListEditor addRow={() => console.log('wire this up to state')} />} />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
