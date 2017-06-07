import { createStore } from 'redux'

const DEFAULT_STATE = {
  rows: [
    {key: 1, group: 'meat', title: 'Kebab', checked: false},
    {key: 2, group: 'meat', title: 'Sausage', checked: false},
    {key: 3, group: 'meat', title: 'Ham', checked: true},
    {key: 4, group: 'green', title: 'Salad', checked: false},
    {key: 5, group: 'green', title: 'Tomato', checked: true}
  ],
  newItemTextField: '',
  newItemGroupTextField: ''
}

const toggleRow = (state, action) => {
  const newState = {}
  let newRows = state.rows.map(row => {
    if (row.key === action.id) {
      row.checked = !row.checked
    }
    return row
  })
  Object.assign(newState, state, {rows: newRows})
  return newState
}

const addRow = (state, action) => {
  const newState = {}
  let newRow = {
    key: 6, // generate
    group: action.row.group,
    title: action.row.title,
    checked: false
  }
  let rows = this.state.rows
  rows.push(newRow)
  Object.assign(newState, state, {rows: rows})
  return newState
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_ROW':
      return toggleRow(state, action)
    case 'ADD_ROW':
      return addRow(state, action)
    default:
      return state
  }
}

const store = createStore(rootReducer)

export default store
