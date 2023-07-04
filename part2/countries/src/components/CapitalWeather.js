import axios from 'axios'
import { useState, useEffect } from 'react'

const CapitalWeather = (props) => {
    const [weather, setWeather] = useState(null)
    const capital = props.selectedCountry.capital[0]
    const api_key = process.env.REACT_APP_API_KEY
    
    console.log(props.selectedCountry.capital[0])
    console.log(weather)

    useEffect(() => {
        console.log('effect run, capital is now', capital)
        if (capital) {
          console.log('fetching weather...')
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
            .then(response => {
              setWeather(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        }
      }, [capital, api_key])

    return (
        <div>
          <h2>Weather in {capital}</h2>
          temperature {(weather.main.temp)-273.15} Celcius
          <br/>
          <img alt={weather.weather[0].description} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
          <br/>
          Wind {weather.wind.speed} m/s 
        </div>
    )
}

export default CapitalWeather