import axios from 'axios'

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

export const addCatalogData = (catalog) => {
  return {
    type: 'ADD_CATALOG_DATA',
    catalog
  }
}

export const getCatalogDataFromApi = () => {

  return function (dispatch, getState) {
    axios.get('http://localhost:3000/catalog')
      .then((res) => dispatch(addCatalogData(res.data)))
      .catch((error) => console.log('api error', error))
  }
}
