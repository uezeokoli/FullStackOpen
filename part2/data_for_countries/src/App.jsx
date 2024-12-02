import { useState, useEffect } from 'react'
import countryService from './services/countryService'
import weatherService from './services/weatherService'

function App() {
  const [newCountry, setNewCountry] = useState('')
  const [countryList, setCountryList] = useState([])
  const [filteredContries, setFilteredCountries] = useState([])
  const [weatherData, setWeatherData] = useState([])

  

  const initializeCounties = () => {
    countryService.getAll()
    .then(response => {
      setCountryList(response)
    })
  }

  useEffect(initializeCounties, [])

  const changeInput = (event) => {
    const input_value = event.target.value
    setNewCountry(event.target.value)

    const filtered_country_objs = countryList.filter(countryObject => {
      return countryObject.name.common.toLowerCase().includes(input_value.toLowerCase())
    })
    setFilteredCountries(filtered_country_objs)
    
    if (filtered_country_objs.length === 1) {
      const country = filtered_country_objs[0]
      const [lat, lon] = country.capitalInfo.latlng
      weatherService.getWeather(lat,lon).then(response => setWeatherData(response))
    } 
  }
  const showCountry = (country) =>{
    setFilteredCountries([country])
  }
  return (
    <div>
      <div>find countries <Search onChange={changeInput}/></div>
      <CountryInfo countryObjects={filteredContries} onShow={showCountry}/>
      <Weather weatherData={weatherData} countries={filteredContries} />
    </div>
  )
}

const Search = (props) => {
  return (
    <input onChange={props.onChange}/>
  )
}

const Weather = (props) => {
  const {weatherData, countries} = props
  const country = countries[0]
  const icon_url = 'https://openweathermap.org/img/wn/'
  if (countries.length === 1 && weatherData.list){
    console.log(`${icon_url + weatherData.list[0].weather[0].icon}`)
    return (
      <div>
      <div><h1>Weather in {country.name.common}</h1></div>
      <div>temperatuture {weatherData.list[0].main.temp} Celcius</div>
      <img src={`${icon_url + weatherData.list[0].weather[0].icon}.png`}/>
      <div>wind {weatherData.list[0].wind.speed} m/s</div>
    </div>
  )
}
}

const CountryInfo = (props) => {
  const {countryObjects} = props
  if (countryObjects.length > 10) {
    return  <div>Too many matches, specify another filter</div>
  }
  else if (countryObjects.length === 0){
    return(
      <div>no matches</div>
    )
  }
  else if (countryObjects.length === 1){
    const country = countryObjects[0]
    const language_array = Object.values(country.languages)
    return (
      <div>
        <div><h1>{country.name.common}</h1></div>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <b>languages:</b>
        <ul>
          {language_array.map(language => <li key={language}>{language}</li>)}
        </ul>

        <img src={`${country.flags.png}`}/>
      </div>
    )
  }

  return (
    <div>
      {countryObjects.map(country =>
      <div key={country.name.common}>{country.name.common}<button onClick={() => props.onShow(country)}>show</button></div>)}
    </div>
  )
}
export default App
