import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addRow } from './state/actions'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import List, {
  ListItem,
  ListItemText
} from 'material-ui/list'
import Divider from 'material-ui/divider'

class ShoppingListEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      titleError: false,
      group: '',
      groupError: false
    }
    this.handleNewItemFormSubmit = this.handleNewItemFormSubmit.bind(this)
    this.handleAddRow = this.handleAddRow.bind(this)
  }
  handleNewItemFormSubmit (e) {
    e.preventDefault()
    if (this.state.title === '') {
      this.setState({titleError: true})
      return
    }
    this.setState({titleError: false})
    this.handleAddRow(this.state.title, this.state.group)
    this.setState({
      title: '',
      group: ''
    })
  }
  handleAddRow(title, group) {
    this.props.addRow({
      title: title,
      group: group
    })
  }
  render () {
    return (
      <div className='shoppingListContainer'>
        <AppBar>
          <Toolbar>
            <Link to='/'>
              <Button raised accent>Close</Button>
            </Link>
          </Toolbar>
        </AppBar>
        <div>
          <form onSubmit={this.handleNewItemFormSubmit}>
            <TextField
              label='New item'
              value={this.state.title}
              onChange={(event) => this.setState({title: event.target.value})}
              error={this.state.titleError}
            />
            <TextField
              label='Group'
              value={this.state.group}
              onChange={(event) => this.setState({group: event.target.value})}
              error={this.state.groupError}
            />
            <Button raised type='submit'>Add</Button>
          </form>
        </div>
        <div>
          <List>
            {this.props.catalog.map(row => {
              return (
                <div key={row.title}>
                  <Divider light />
                  <ListItem button onClick={() => this.handleAddRow(row.title, row.group)}>
                    <ListItemText primary={row.title} secondary={row.group} />
                  </ListItem>
                </div>
              )
            })}
            <Divider light />
          </List>
        </div>
      </div>
    )
  }
}

ShoppingListEditor.propTypes = {
  catalog: PropTypes.array,
  addRow: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    catalog: state.catalog
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRow: row => dispatch(addRow(row))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingListEditor)
