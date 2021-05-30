import React from 'react'
const Weather=({ country,weather})=>{
    const currentone = weather[0].current
    return(
        <>
        <h2>Weather in {country.capital}</h2>
        <p><b>temperature</b>: {currentone.temperature}° Celcius</p>
        <img src={currentone.weather_icons[0]} alt="Weather icon"></img>
        <p><b>wind</b>: {currentone.wind_speed} mph direction {currentone.wind_dir}</p>
        </>
    )
}

export default Weather