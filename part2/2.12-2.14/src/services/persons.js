import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons/'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = (addPerson) => {
    const request = axios.post(baseUrl, addPerson)
    return request.then((response) => response.data)
}

const personDelete = (idToDelete) => {
    const request = axios.delete(`${baseUrl}${idToDelete}`)
    return request.then(() => true).catch(() => false)
}

export default {getAll, create, personDelete}