import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import List, {
  ListItem,
  ListItemText,
  ListSubheader
} from 'material-ui/list'
import Checkbox from 'material-ui/checkbox'
import Divider from 'material-ui/divider'

class ShoppingList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
                onClick={event => this.props.handleRowChange(row.key)}
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
    let { rows } = this.props
    let groups = {}
    rows.map(row => {
      if (groups[row.group] === undefined) {
        groups[row.group] = [row]
      } else {
        groups[row.group].push(row)
      }
    })
    return (
      <div className='shoppingListContainer'>
        <AppBar>
          <Toolbar>
            <Link to='/edit'>
              <Button raised accent>Edit</Button>
            </Link>
          </Toolbar>
        </AppBar>
        {Object.keys(groups).map(group => this.listSubGroup(groups[group], group))}
      </div>
    )
  }
}

export default ShoppingList
