import { createStore } from 'redux'
import uniqueId from 'lodash.uniqueid'

const DEFAULT_STATE = {
  rows: [
    {key: uniqueId(), group: 'meat', title: 'Kebab', checked: false},
    {key: uniqueId(), group: 'meat', title: 'Sausage', checked: false},
    {key: uniqueId(), group: 'meat', title: 'Ham', checked: true},
    {key: uniqueId(), group: 'green', title: 'Salad', checked: false},
    {key: uniqueId(), group: 'green', title: 'Tomato', checked: true}
  ],
  catalog: [
    {title: 'Tomato', group: 'green'},
    {title: 'Tomato 2', group: 'green'},
    {title: 'Cucumber', group: 'green'},
    {title: 'Salad', group: 'green'},
    {title: 'Onion', group: 'green'},
    {title: 'Kebab', group: 'meat'},
    {title: 'Sausage', group: 'meat'},
    {title: 'Ham', group: 'meat'},
    {title: 'Lamb', group: 'meat'},
    {title: 'Steak', group: 'meat'},
    {title: 'Butter', group: 'dairy'},
    {title: 'Milk', group: 'dairy'},
    {title: 'Cheese', group: 'dairy'}
  ],
  groupCatalog: [
    'green',
    'meat',
    'dairy'
  ]
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

const deleteRow = (state, action) => {
  const newState = {}
  let newRows = state.rows.filter(row => row.key !== action.id)
  Object.assign(newState, state, {rows: newRows})
  return newState
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'ADD_ROW':
      return addRow(state, action)
    case 'TOGGLE_ROW':
      return toggleRow(state, action)
    case 'DELETE_ROW':
      return deleteRow(state, action)
    default:
      return state
  }
}

const store = createStore(rootReducer)

export default store
