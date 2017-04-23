import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'

class ShoppingListEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      newItemTextField: '',
      newItemGroupTextField: ''
    }
    this.handleNewItemFormSubmit = this.handleNewItemFormSubmit.bind(this)
  }
  handleNewItemFormSubmit(e) {
    // console.log(e)
    e.preventDefault()
    this.props.addRow({
      title: this.state.newItemTextField,
      group: this.state.newItemGroupTextField
    })
    this.setState({
      newItemTextField: '',
      newItemGroupTextField: ''
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
              value={this.state.newItemTextField}
              onChange={(event) => this.setState({newItemTextField: event.target.value })}
            />
            <TextField
              label='Group'
              value={this.state.newItemGroupTextField}
              onChange={(event) => this.setState({newItemGroupTextField: event.target.value })}
            />
            <Button raised type='submit'>Add</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default ShoppingListEditor
