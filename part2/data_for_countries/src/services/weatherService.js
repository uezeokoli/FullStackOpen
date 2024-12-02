import axios from 'axios'
const url = 'https://api.openweathermap.org/data/2.5/forecast?'

const api_key = import.meta.env.VITE_SOME_KEY
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// requeired inputs: lat, long, api 
const getWeather = (lat, lon) => {
    return(
        axios.get(`${url}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`).then(response => response.data)
        .catch(() => console.log("error when fetching data"))
    )
}

export default {getWeather}