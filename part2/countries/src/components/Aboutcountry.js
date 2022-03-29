import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Weather from './Weather'
const Aboutcountry = ({ country }) => {
    const [weather, setWeather] = useState([])
    const api_key = String(process.env.REACT_APP_API_KEY)
    console.log(api_key)
    const params = {
      access_key: '7577625d5a44d8fdef6210165cf0234a',
      query: country.capital
    }
    useEffect(()=>{
      axios.get('http://api.weatherstack.com/current', {params}).then(response => {
                           const apiResponse = response.data;
                           console.log(apiResponse)
                           setWeather([apiResponse])
                           }).catch(error => {
                               console.log(error);
                                     });
                 },[])
    if (weather.length>0){
      return(
        <div> 
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>Spoken languages</h2>
            <ul>
                {country.languages.map((lang) =>
                <li key={lang.name}>{lang.name}</li>
                )} 
            </ul>
            <img width="200px" src={country.flag} alt={country.name}/>
            <Weather country={country} weather={weather}/>
        </div>
    )
    }
    else{
      return(
        <div> 
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>Spoken languages</h2>
            <ul>
                {country.languages.map((lang) =>
                <li key={lang.name}>{lang.name}</li>
                )} 
            </ul>
            <img width="200px" src={country.flag} alt={country.name}/>
        </div>
    )
    }
}

export default Aboutcountry