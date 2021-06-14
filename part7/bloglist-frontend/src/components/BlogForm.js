import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button,Row,Col } from 'react-bootstrap'
const BlogForm=(props)=>{
    const handleBlog=async(event)=>{
        event.preventDefault()
        const title=event.target.Title.value
        const author=event.target.Author.value
        const url=event.target.Url.value
        event.target.Title.value=''
        event.target.Author.value=''
        event.target.Url.value=''
         props.addBlog({title:title,author:author,url:url})
    }
    return(
    <div style={{width:"20%",marginLeft:"10px"}}>
      <h2>Create new</h2>
      <Form onSubmit={handleBlog}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title" type="text" name="Title"
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id="author" type="text" name="Author"
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id="url" type="text" name="Url"
          />
          <br/>
          <Button variant="success" type="create">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
    )
}
BlogForm.propTypes={
   addBlog:PropTypes.func.isRequired
}

export default BlogForm