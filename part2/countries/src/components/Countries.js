import React from 'react'
import Aboutcountry from './Aboutcountry'
const Country=({country,setFilter})=>{
  const handleShowClick = () => {
    setFilter(country.name)
}

    return(
    <div>{country.name}<button onClick={handleShowClick}>show</button></div>
    )
  }
  
  const Countries=({countries,filter,setFilter})=>{
    const x=countries.filter(x=>x.name.toLowerCase().includes(filter.toLowerCase()))

    if (x.length > 10 && filter.length>0){
          return(
            <div>Too many matches, specify another filter</div>
          )
    }
    else if((x.length>1 && x.length<=10) && filter.length>0){
    return(
      <div>
         {countries.filter(x=>x.name.toLowerCase().includes(filter.toLowerCase())).map((country,id) =><Country country={country} setFilter={setFilter} key={id}/>)}
      </div>
    )
    }
    else if(x.length===1&& filter.length>0) {
      return (
        <div>
          <Aboutcountry country={x[0]}/>
        </div>
      )
    }
    else{
      return <div></div>
    }
  }

  export default Countries