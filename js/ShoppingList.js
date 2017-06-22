import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toggleRow } from './state/actions'
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

const ListSubGroup = ({title, done, total, children}) => {
  return (
    <div>
      <ListSubheader>
        <strong>{title.toUpperCase()}</strong> ({done} / {total})
      </ListSubheader>
      <List>
        {children}
        <Divider light />
      </List>
    </div>
  )
}
ListSubGroup.propTypes = {
  title: PropTypes.string,
  done: PropTypes.number,
  total: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

const SubGroupRow = ({id, checked, title, onToggleRow}) => {
  return (
    <div>
      <Divider light />
      <ListItem onTouchTap={event => onToggleRow(id)}>
        <Checkbox checked={checked} />
        <ListItemText primary={title} />
      </ListItem>
    </div>
  )
}
SubGroupRow.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  title: PropTypes.string,
  onToggleRow: PropTypes.func
}

class ShoppingList extends React.Component {
  transformRowsToRowGroups (rows) {
    return rows.reduce((groups, row) => {
      if (groups[row.group] === undefined) {
        groups[row.group] = [row]
      }
      else {
        groups[row.group].push(row)
      }
      return groups
    }, [])
  }
  render () {
    let groups = this.transformRowsToRowGroups(this.props.rows)
    return (
      <div className='shoppingListContainer'>
        <AppBar>
          <Toolbar>
            <Link to='/edit'>
              <Button raised accent>Edit</Button>
            </Link>
          </Toolbar>
        </AppBar>
        {Object.keys(groups).map(group =>
          <ListSubGroup
            key={group}
            title={group}
            done={groups[group].filter(row => row.checked).length}
            total={groups[group].length}
          >
            {groups[group].map((row) =>
              <SubGroupRow
                key={row.key}
                checked={row.checked}
                title={row.title}
                id={row.key}
                onToggleRow={this.props.onToggleRow}
              />
            )}
          </ListSubGroup>)}
      </div>
    )
  }
}

ShoppingList.propTypes = {
  onToggleRow: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.object)
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
