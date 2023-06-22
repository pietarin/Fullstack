import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState(null)
  const [countryToFind, setCountryToFind] = useState('')
  const [countriesFound, setCountriesFound] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    setSelectedCountry(null)
    console.log('effect run, countryToFind is now', countryToFind)
    if (countryToFind) {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [countryToFind])

  const handleChange = (event) => {
    const updatedValue = event.target.value
    setValue(updatedValue)
    search(updatedValue)
  }

  const search = (searchTerm) => {
    setCountryToFind(searchTerm)
    filterCountries(searchTerm)
  }

  const filterCountries = (countryToFind) => {
    if (countries) {
      const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryToFind.toLowerCase()))
      setCountriesFound(filteredCountries)
    }
  }

  const languages = (list) => {
    if (list === null || list === undefined) {
      return []
    }
    return (
      Object.values(list)
    )
  }

  const handleShowClick = (country) => {
    setSelectedCountry(country)
  }

  if (countriesFound === null) {
    return (
      <>
        <form>
          find countries <input value={value} onChange={handleChange} />
        </form>
      </>
    )
  } else if (countriesFound.length > 10) {
    return (
      <>
        <form>
          find countries <input value={value} onChange={handleChange} />
        </form>
        Too many matches, specify another filter
      </>
    )
  } else if (countriesFound.length <= 10 && countriesFound.length > 1) {
    if (selectedCountry) {
      return (
        <>
          <form>
            find countries <input value={value} onChange={handleChange} />
          </form>
          <h1>{selectedCountry.name.common}</h1>
          capital {selectedCountry.capital}
          <br />
          area {selectedCountry.area}
          <h3>languages:</h3>
          <ul>
            {languages(selectedCountry.languages).map(language =>
              <li key={language}>
                {language}
              </li>
            )}
          </ul>
          <img alt={selectedCountry.flags.alt} src={selectedCountry.flags.png} />
        </>
      )
    } else {
      return (
        <>
          <form>
            find countries <input value={value} onChange={handleChange} />
          </form>
          <CountryList countriesFound={countriesFound} handleShowClick={handleShowClick} />
        </>
      )
    }
  } else {
    return (
      <>
        <form>
          find countries <input value={value} onChange={handleChange} />
        </form>
        <h1>{countriesFound[0].name.common}</h1>
        capital {countriesFound[0].capital}
        <br />
        area {countriesFound[0].area}
        <h3>languages:</h3>
        <ul>
          {languages(countriesFound[0].languages).map(language =>
            <li key={language}>
              {language}
            </li>
          )}
        </ul>
        <img alt={countriesFound[0].flags.alt} src={countriesFound[0].flags.png} />
      </>
    )
  }
}

export default App;
