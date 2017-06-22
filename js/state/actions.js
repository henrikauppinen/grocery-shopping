export const toggleRow = (id) => {
  return {
    type: 'TOGGLE_ROW',
    id
  }
}

export const addRow = (row) => {
  return {
    type: 'ADD_ROW',
    row: row
  }
}

export const deleteRow = (id) => {
  return {
    type: 'DELETE_ROW',
    id
  }
}