import React,{useState} from 'react'
const Blog = ({blog}) => {
  return(
  <div>
    <div className="blogstart">{blog.title} {blog.author}
    </div>
  </div> )
}

export default Blog