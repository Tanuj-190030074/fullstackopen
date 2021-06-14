import React from 'react'

const SingleUser=({singleuser})=>{
    if(!singleuser){
        return null
    }
    return(
        <div>
            <h2>{singleuser.username}</h2>
            <h4>added blogs</h4>
            <ul>
            {singleuser.blogs.map(x=><li>{x.title}</li>)}
            </ul>
        </div>
    )
}
export default SingleUser