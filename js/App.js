import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Text from 'material-ui/Text'
import Button from 'material-ui/Button'
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader
} from 'material-ui/list'
import Checkbox from 'material-ui/checkbox'
import Divider from 'material-ui/divider'

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
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e, key) {
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
  listSubGroup (rows, group) {
    console.table(rows)
    let done = rows.filter(row => row.checked).length
    let total = rows.length
    return (
      <div key={group}>
        <Divider />
        <ListSubheader>
          {group} ({done} / {total})
        </ListSubheader>
        <List>
          {rows.map(row => {
            return (
              <ListItem
                key={row.key}
                button
                onClick={event => this.handleClick(event, row.key)}
              >
                <Checkbox
                  checked={row.checked}
                />
                <ListItemText primary={row.title} />
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }
  render () {
    let { rows } = this.state
    let groups = {}
    rows.map(row => {
      if (groups[row.group] === undefined) {
        groups[row.group] = [row]
      } else {
        groups[row.group].push(row)
      }
    })
    return (
      <MuiThemeProvider>
        <div className='shoppingListContainer'>
          <AppBar>
            <Toolbar>
              <Text colorInherit>Shopping list</Text>
              <Button contrast>Add</Button>
            </Toolbar>
          </AppBar>
          {Object.keys(groups).map(group => this.listSubGroup(groups[group], group))}
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
