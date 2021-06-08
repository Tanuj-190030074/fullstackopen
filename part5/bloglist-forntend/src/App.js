import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const[errorMessage,setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage({text:"wrong username or password",type:"error"})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout=(event)=>{
    event.preventDefault()
    window.localStorage.removeItem("loggedBlogappUser")
    setUser(null)
  }
  
  const addBlog= async(obj)=>{
    try{
      const response=await blogService.createblog(obj)
      setBlogs(blogs.concat(response))
      blogFormRef.current.toggleVisibility()
      setErrorMessage({text:`a new blog ${obj.title} by ${obj.author} added`,type:"success"})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
   }
   catch(exception)
   {   console.log(exception)
      setErrorMessage({text:`${exception.response.data.error}`,type:"error"})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
   }
  }

  const handleLike=async(obj)=>{
    try{
        const response=await blogService.updateblog(obj.id,obj)
        setErrorMessage({text:`${response.title} updated successfully`,type:'success'})
        const updatedblogs=blogs.map(x=>x.id!==response.id?x:response)
        setBlogs(updatedblogs)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
    catch(exception)
    { console.log(exception)
      setErrorMessage({text:`${obj.title} not updated`,type:'error'})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog=async(id) =>{
    try{
         await blogService.deleteblog(id)
         setBlogs(blogs.filter(x=>x.id!==id))
         setErrorMessage({text:`deleted blog successfully`,type:'success'})
         setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
    catch(exception)
    {  
      setErrorMessage({text:`${exception.response.data.error}`,type:'error'})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  return (
    <div>
      <Notification errorMessage={errorMessage} />
      {user===null?
        <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin}/>
      :
       <div>
         <h1>blogs</h1>
         <p>{user.username} logged in<button onClick={handleLogout}>logout</button></p>
         <Togglable buttonLabel='create new blog' ref={blogFormRef}>
             <BlogForm addBlog={addBlog}/>
         </Togglable>
       {blogs.sort((a1,a2)=>a2.likes-a1.likes).map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} user={user} removeBlog={removeBlog} />
      )}
     </div>}
    </div>
  )
}

export default App