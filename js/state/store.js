import { createStore } from 'redux'
import uniqueId from 'lodash.uniqueid'

const DEFAULT_STATE = {
  rows: [
    {key: 1, group: 'meat', title: 'Kebab', checked: false},
    {key: 2, group: 'meat', title: 'Sausage', checked: false},
    {key: 3, group: 'meat', title: 'Ham', checked: true},
    {key: 4, group: 'green', title: 'Salad', checked: false},
    {key: 5, group: 'green', title: 'Tomato', checked: true}
  ],
  catalog: [
    {title: 'Tomato', group: 'green'},
    {title: 'Salad', group: 'green'},
    {title: 'Kebab', group: 'meat'},
    {title: 'Sausage', group: 'meat'},
    {title: 'Ham', group: 'meat'}
  ],
  groupCatalog: [
    'green',
    'meat'
  ]
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
    key: uniqueId(),
    title: action.row.title,
    group: action.row.group,
    checked: false
  }
  let rows = state.rows
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
