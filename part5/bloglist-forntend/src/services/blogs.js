import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = async() => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createblog = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateblog = async(id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${ baseUrl }/${id}`, newObject,config)
  return response.data
}

const deleteblog = async(id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${ baseUrl }/${id}`,config)
}

export default { getAll, createblog, updateblog, setToken,deleteblog }