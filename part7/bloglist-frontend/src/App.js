import React, {useEffect,useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'
import NavigationBar from './components/NavigationBar'
import User from './components/User'
import {createBlog,removeItem,updateLike,initializeBlogs} from './reducers/blogReducer'
import {Table} from 'react-bootstrap'
import { initializeuser,logoutuser } from './reducers/loginReducer'
import { initializeusers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link,useRouteMatch,useHistory,Redirect
} from "react-router-dom"

const App = () => {
  const blogs=useSelector(state=>state.blogs)
  const user=useSelector(state=>state.user)
  const users=useSelector(state=>state.users)
  const blogFormRef = useRef()
  const dispatch=useDispatch()
  const history=useHistory()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeuser())
    dispatch(initializeusers())
  }, [dispatch])
  

  const handleLogout=(event)=>{
    event.preventDefault()
    dispatch(logoutuser())
  }
  
  const addBlog= async(obj)=>{
      dispatch(createBlog(obj))
      blogFormRef.current.toggleVisibility()
  }

  const handleLike=async(obj)=>{
        dispatch(updateLike(obj.id,obj))
  }

  const removeBlog=async(id) =>{
         dispatch(removeItem(id,history))
  }


  const match=useRouteMatch('/users/:id')
  const singleuser=match?users.find(x=>x.id===match.params.id):null
  const match2=useRouteMatch('/blogs/:id')
  const singleblog=match2?blogs.find(x=>x.id===match2.params.id):null

  const padding = { padding: 5 }
  return (
    <div>
      <Notification/>
      <NavigationBar handleLogout={handleLogout}/>
    <Switch>
      <Route path="/users/:id">
        <div>
        {user===null?<LoginForm/>:
           <div>
           <h1>User</h1>
           <SingleUser user={user} singleuser={singleuser} handleLike={handleLike} removeBlog={removeBlog}/>
           </div>
        }
        </div>
      </Route>
      <Route path="/users">
      <div>
      {user===null?
        <LoginForm/>
      :
       <div>
         <h1>Users</h1>
         <Table striped bordered hover>
  <thead>
    <tr>
      <th>username</th>
      <th>blogs created</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) =><tr key={user.username}><User key={user.id} user={user}/></tr>)}
  </tbody>
</Table>
     </div>}
    </div>
    </Route>
    <Route path="/blogs/:id">
    <div>
      
      {user===null?
        <LoginForm/>
      :
       <div>
         <h1>blog</h1>
          <SingleBlog user={user} blog={singleblog} handleLike={handleLike} removeBlog={removeBlog}/>
     </div>}
    </div>
    </Route>
    <Route path="/login">
      <LoginForm/>
    </Route>
      <Route path="/">
      <div>
      
      {user===null?
        <LoginForm/>
      :
       <div>
         <h1>blogs</h1>
         <Togglable buttonLabel='create new blog' ref={blogFormRef}>
             <BlogForm addBlog={addBlog}/>
         </Togglable>
       <Blogs/>
     </div>}
    </div>
      </Route>
    </Switch>
    </div>
  )
}

export default App