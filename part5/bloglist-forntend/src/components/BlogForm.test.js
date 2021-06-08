import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

test('testing blog form',()=>{
    const addBlog=jest.fn()
    const component=render(
        <BlogForm addBlog={addBlog}/>
    )
    const titleinput=component.container.querySelector('#title')
    const authorinput=component.container.querySelector('#author')
    const urlinput=component.container.querySelector('#url')
    const form=component.container.querySelector('form')
    fireEvent.change(titleinput, { 
        target: { value: 'testing blog form' } 
      })
      fireEvent.change(authorinput, { 
        target: { value: 'testing blog form' } 
      })
      fireEvent.change(urlinput, { 
        target: { value: 'testing blog form' } 
      })
      fireEvent.submit(form)
      expect(addBlog.mock.calls).toHaveLength(1)
      expect(addBlog.mock.calls[0][0].title).toBe('testing blog form')

})