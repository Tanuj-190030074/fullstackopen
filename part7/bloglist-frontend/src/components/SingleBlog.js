import React from 'react'
import { updatecomment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import {Button,Form,Row,Col} from 'react-bootstrap'
const SingleBlog=({user,blog,handleLike,removeBlog})=>{
    if(!blog)
    {
        return null
    }
    const dispatch =useDispatch()
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

      const commentevent=(event)=>{
        event.preventDefault()
       const commentToAdd = event.target.comment.value
        event.target.comment.value = ''
        dispatch(updatecomment(blog.id,blog,commentToAdd))
      }
    return(
        <div >
    <h2>{blog.title} {blog.author}</h2>
       <div className="blogurl"><a href={blog.url} target="_blank">{blog.url}</a></div>
       <div className="bloglikes">likes {blog.likes} <Button id="likebutton" size="sm" variant="info" className="likebutton" onClick={liked}>like</Button></div>
       <div className="blogcreator">added by {blog.user.username}</div>
       <form onSubmit={commentevent}>
              <div>
                <Row>
              <Form.Control id="comment" type="text" name="comment" style={{width:"20%",border: "1px solid"}} />
                      <Button id="comment-button" type="submit">
                            add comment
                      </Button>
                </Row>
              </div>
        </form>
          <ul>
            {blog.comments.map((comment) => <li key={comment} >{comment}</li>)}
          </ul>
       {user!==null && user.username===blog.user.username &&
       <Button id="removebutton" variant="warning" onClick={handleRemove}>remove</Button>}
    </div>
    )
}

export default SingleBlog