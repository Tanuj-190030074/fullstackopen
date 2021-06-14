import React from 'react'
import Blog from './Blog'
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'
import {Table} from 'react-bootstrap'

const Blogs=()=>{
    const blogs=useSelector(state=>state.blogs)
    
    return (
        <Table striped>
      <tbody>
        {blogs.map(blog =>
          <tr key={blog.id}>
            <td>
            <Link to={`/blogs/${blog.id}`} ><Blog key={blog.id} blog={blog}/></Link>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
    )

}

export default Blogs