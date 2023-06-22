const CountryList = (props) => {
    return (
        <div>
        {props.countriesFound.map(country =>
            <div key={country.name.common}>
              {country.name.common}
              <button key={country.name.common} onClick={() => props.handleShowClick(country)}>show</button>
            </div>
            )
          }
        </div>
    )
}

export default CountryList