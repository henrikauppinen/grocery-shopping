import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import uniqueId from 'lodash.uniqueid'

const DEFAULT_STATE = {
  rows: [
    {key: uniqueId(), group: 'meat', title: 'Kebab', checked: false},
    {key: uniqueId(), group: 'meat', title: 'Sausage', checked: false},
    {key: uniqueId(), group: 'meat', title: 'Ham', checked: true},
    {key: uniqueId(), group: 'green', title: 'Salad', checked: false},
    {key: uniqueId(), group: 'green', title: 'Tomato', checked: true}
  ],
  catalog: [],
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

const addCatalogData = (state, action) => {
  console.log(action.catalog)
  const newState = {}
  Object.assign(newState, state, {catalog: action.catalog})
  console.log(newState)
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
    case 'ADD_CATALOG_DATA':
      return addCatalogData(state, action)
    default:
      return state
  }
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

export default store
