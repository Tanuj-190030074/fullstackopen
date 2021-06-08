import React,{useState} from 'react'
const Blog = ({blog,handleLike,user,removeBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
   const [visible,setVisible]=useState(false)
   const showWhenVisible = {display:visible?'':'none'}
   const toggleVisibility = () => {
    setVisible(!visible)
  }
  const liked=(event)=>{
    event.preventDefault()
    const updatedblog={...blog,likes:blog.likes+1}
    handleLike(updatedblog)
  }

  const handleRemove = (event)=>{
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
    {
    removeBlog(blog.id)
    }
  }
  const buttonname=visible?'hide':'view'
  return(
  <div style={blogStyle}>
    <div className="blogstart">{blog.title} {blog.author} <button onClick={toggleVisibility}>{buttonname}</button></div>
    <div className="invisibleatfirst" style={showWhenVisible}>
       <div className="blogurl">{blog.url}</div>
       <div className="bloglikes">likes {blog.likes} <button id="likebutton" className="likebutton" onClick={liked}>like</button></div>
       <div className="blogcreator">{blog.user.username}</div>

       {user!==null && user.username===blog.user.username &&
       <button id="removebutton" onClick={handleRemove}>remove</button>}
    </div>
  </div> )
}

export default Blog