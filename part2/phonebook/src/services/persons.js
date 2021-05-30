import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll=() =>{
    const request=axios.get(baseUrl)
    console.log("entered")
    return request.then(response=>response.data)
}

const insert=(newObject) =>{
    const request=axios.post(baseUrl,newObject)
    return request.then(response=>response.data)
}

const deleteperson =(id) => {
      return axios.delete(`${baseUrl}/${id}`)
}

const updateperson=(id,newObject)=>{
    const request= axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response=>response.data)
}

export default 
{ getAll : getAll, 
  insert : insert,
  deleteperson :deleteperson,
  updateperson : updateperson
}