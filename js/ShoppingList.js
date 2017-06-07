import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleRow } from './stateActions'
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
                onClick={event => this.props.onToggleRow(row.key)}
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

ShoppingList.propTypes = {
  onToggleRow: PropTypes.func,
  rows: PropTypes.array
}

const mapStateToProps = (state) => {
  return {
    rows: state.rows
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleRow: id => dispatch(toggleRow(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingList)
