import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const testUser = {
    id: 'gf342g3h2',
    username: 'tanuj',
    name: 'tanuj',
    password: 'tanuj123',
  }

const blog={
    id:'5ds5ds6f7sfd6df7s7a',
    title: 'hello world',
    author:'hello author',
    url:'hello.com',
    likes:7,
    user:testUser,
}

test('rendering blog',() => {
    const component=render(
        <Blog blog={blog} user={testUser}/>
    )
    const blogstart=component.container.querySelector('.blogstart')
    expect(blogstart).toHaveTextContent(blog.title)
    expect(blogstart).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(
        'hello world'
      )

    const div = component.container.querySelector(".invisibleatfirst")
    expect(div).toBeDefined()
    expect(div).toHaveStyle('display: none')
})

test('clicking view button',() => {
    const component=render(
        <Blog blog={blog} user={testUser}/>
    )
    const button=component.getByText("view")
    fireEvent.click(button)
    const div = component.container.querySelector(".invisibleatfirst")
    expect(div).toBeDefined()
    expect(div).not.toHaveStyle('display: none')

    const div2 = component.container.querySelector(".blogurl")
    expect(div2).toBeDefined()
    expect(div2).not.toHaveStyle('display: none')

    const div3 = component.container.querySelector(".bloglikes")
    expect(div3).toBeDefined()
    expect(div3).not.toHaveStyle('display: none')
})

test('if the like button is clicked twice, the event handler the component received as props is called twice.',()=>{
    const handleLike=jest.fn()
    const component=render(
        <Blog blog={blog} user={testUser} handleLike={handleLike}/>
    )
    const button=component.getByText("view")
    fireEvent.click(button)
    const likebutton=component.getByText("like")
    fireEvent.click(likebutton)
    fireEvent.click(likebutton)
    expect(handleLike.mock.calls).toHaveLength(2)

})