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

const updateNewItemText = (action, state) => {
  const newState = {}
  Object.assign(newState, state, {newItemTextField: action.text})
  return newState
}

const updateNewItemGroupText = (action, state) => {
  const newState = {}
  Object.assign(newState, state, {newItemGroupTextField: action.text})
  return newState
}

const addRow = (state, action) => {
  console.log(action)
  const newState = {}
  let newRow = {
    key: 6, // generate
    group: action.row.group,
    title: action.row.title,
    checked: false
  }
  let rows = state.rows
  rows.push(newRow)
  console.log(state)
  console.log(newState)
  Object.assign(newState, state, {rows: rows})
  return newState
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'TOGGLE_ROW':
      return toggleRow(state, action)
    case 'UPDATE_NEW_ITEM_TEXT':
      return updateNewItemText(state, action)
    case 'UPDATE_NEW_ITEM_GROUP_TEXT':
      return updateNewItemGroupText(state, action)
    case 'ADD_ROW':
      return addRow(state, action)
    default:
      return state
  }
}

const store = createStore(rootReducer)

export default store
