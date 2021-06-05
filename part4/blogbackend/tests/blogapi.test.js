const mongoose = require('mongoose')
const app=require('../app')
const helper = require('./test_helper')
const blogsmodel=require('../models/blog')
const usermodel = require('../models/user')
const supertest = require('supertest')
const api=supertest(app)

beforeEach(async () => {
  await blogsmodel.deleteMany({})
  await usermodel.deleteMany({})
  for(let blog of helper.initialBlogs)
  {
      const obj=new blogsmodel(blog)
      await obj.save()
  }
})

describe('test for getting data from db',() => {
 test('there are n blogs', async () => {
     const response = await api.get('/api/blogs')
   
     expect(response.body).toHaveLength(helper.initialBlogs.length)
 })
 
 test('the first blog is on react patterns', async () => {
     const response = await api.get('/api/blogs')
   
     expect(response.body[0].likes).toBe(7)
 })
})


test('The unique identifier property of the blog posts is by default _id', async () => {
    const blogs = await blogsmodel.find({})
    expect(blogs[0].id).toBeDefined()
  })


describe('tests for posting data to db',() => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'tanuj',
      name: 'tanuj',
      password: 'tanuj123',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })
  test('verify that the total number of blogs in the system is increased by one',async () => {
    const newblog={
     title: "Type wars2",
     author: "Robert C. Martin2",
     url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars2.html",
     likes: 3
    }
    await api.post('/api/blogs').send(newblog).set(headers).expect(201).expect('Content-Type', /application\/json/)
    const endblogs=await helper.blogsInDb()
    expect(endblogs).toHaveLength(helper.initialBlogs.length+1)
 
    const contents = endblogs.map(x => x.author)
    expect(contents).toContain("Robert C. Martin")
 })
})

describe("tests for error handling if any field is missing", () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'tanuj',
      name: 'tanuj',
      password: 'tanuj123',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })
  test('empty like defaults to zero', async () => {

    const sendingblog={
      title: 'checking default',
      author: 'TANUJ',
      url: 'https://fullstackopen.com/',
    }

    await api
      .post('/api/blogs')
      .send(sendingblog).set(headers)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsInDb.filter(blog=>blog.title===sendingblog.title)).toHaveLength(1)
    const blogwithlikes=blogsInDb.find(blog=>blog.title===sendingblog.title)
    expect(blogwithlikes.likes).toBe(0)
  })

  test('blog with no title causes error', async () => {

    const sendingblog={
      author: 'TANUJ2',
      url: 'https://fullstackopen.com/',
      likes:7
    }

    await api
      .post('/api/blogs')
      .send(sendingblog).set(headers)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })

  test('blog with no url causes error', async () => {
    const sendingblog={
      author: 'TANUJ2',
      title:'hello world',
      likes:7
    }

    await api
      .post('/api/blogs')
      .send(sendingblog)
      .expect(400).set(headers)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.initialBlogs.length)
  })
})

describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsatfirst = await helper.blogsInDb()

    const blogatfirst=blogsatfirst[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogatfirst.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    const processedBlogToView = JSON.parse(JSON.stringify(blogatfirst))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'tanuj',
      name: 'tanuj',
      password: 'tanuj123',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })
  test('succeeds with status code 204 if id is valid', async () => {

      const test={
        title:"hello",
        author:"you",
        url:"https://helloworld.com",
        likes:10
      }
      await api.post('/api/blogs').send(test).set(headers).expect(201)
      const blogs= await helper.blogsInDb()
      const tobedeleted=blogs.find(x=>x.title===test.title)
    await api
      .delete(`/api/blogs/${tobedeleted.id}`).set(headers)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        blogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(tobedeleted.title)
  })
  test('fails with statuscode 404 id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a'

    await api
      .delete(`/api/blogs/${invalidId}`).set(headers)
      .expect(400)
  })
})

describe('updation of blog',() => {
  let headers

  beforeEach(async () => {
    const newUser = {
      username: 'tanuj',
      name: 'tanuj',
      password: 'tanuj123',
    }

    await api
      .post('/api/users')
      .send(newUser)

    const result = await api
      .post('/api/login')
      .send(newUser)

    headers = {
      'Authorization': `bearer ${result.body.token}`
    }
  })
  test('updation of likes',async()=>{
    const test={
      title:"hello",
      author:"you",
      url:"https://helloworld.com",
      likes:10
    }
    await api.post('/api/blogs').send(test).set(headers).expect(201)
    const blogs= await helper.blogsInDb()
    const tobeupdated=blogs.find(x=>x.title===test.title)
    const updatedfirstblog={...tobeupdated,likes:tobeupdated.likes+2}
    const updatedrecievedone=await api.put(`/api/blogs/${tobeupdated.id}`).send(updatedfirstblog).set(headers).expect(200)
    .expect('Content-Type', /application\/json/)
    expect(updatedrecievedone.body.likes).toBe(updatedfirstblog.likes)
  })
})

afterAll(()=>{
    mongoose.connection.close()
})