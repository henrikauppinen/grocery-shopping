import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ShoppingList from './ShoppingList'
import ShoppingListEditor from './ShoppingListEditor'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rows: [
        {key: 1, group: 'meat', title: 'Kebab', checked: false},
        {key: 2, group: 'meat', title: 'Sausage', checked: false},
        {key: 3, group: 'meat', title: 'Ham', checked: true},
        {key: 4, group: 'green', title: 'Salad', checked: false},
        {key: 5, group: 'green', title: 'Tomato', checked: true}
      ]
    }
    this.addRow = this.addRow.bind(this)
    this.toggleRow = this.toggleRow.bind(this)
  }
  addRow (row) {
    let newRow = {
      key: 6,
      group: row.group,
      title: row.title,
      checked: false
    }
    let rows = this.state.rows
    rows.push(newRow)
    this.setState({
      rows
    })
  }
  toggleRow (key) {
    let { rows } = this.state
    let newRows = rows.map(row => {
      if (row.key === key) {
        row.checked = !row.checked
      }
      return row
    })
    this.setState({
      rows: newRows
    })
  }
  render () {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route exact path='/' render={() => <ShoppingList rows={this.state.rows} handleRowChange={this.toggleRow} />} />
            <Route path='/edit' render={() => <ShoppingListEditor addRow={this.addRow} />} />
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}

export default App
