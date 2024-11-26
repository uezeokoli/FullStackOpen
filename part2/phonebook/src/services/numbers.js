import axios from 'axios'
const url = "http://localhost:3001/persons"

const getAll = () => {
    return(
        axios.get(url).then(response => response.data)
)
}

const create = (personObject) => {
    return (
        axios.post(url, personObject).then(response => response.data)
    )
}

const update = (name,personObject) => {
    return(
        axios.put(`${url}/${name}`, personObject).then(response => response.data)
    )
}

const remove = (id) => {
    return(
        axios.delete(`${url}/${id}`).then(response => response.data)
    )
}
export default {getAll, create, update, remove}