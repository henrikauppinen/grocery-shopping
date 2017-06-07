export const toggleRow = (id) => {
  return {
    type: 'TOGGLE_ROW',
    id: id
  }
}

export const addRow = (row) => {
  console.log(row)
  return {
    type: 'ADD_ROW',
    row: row
  }
}
