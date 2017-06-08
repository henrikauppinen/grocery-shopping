import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addRow } from './state/actions'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

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
  }
  handleNewItemFormSubmit(e) {
    e.preventDefault()
    if (this.state.title === '') {
      this.setState({
        titleError: true
      })
    }
    this.props.addRow({
      title: this.state.title,
      group: this.state.group
    })

    this.setState({
      title: '',
      group: ''
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
      </div>
    )
  }
}

ShoppingListEditor.propTypes = {
  addRow: PropTypes.func
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRow: row => dispatch(addRow(row))
  }
}
export default connect(
  false,
  mapDispatchToProps
)(ShoppingListEditor)
