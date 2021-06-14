const blogsRouter=require('express').Router()
const jwt = require('jsonwebtoken')
const blogmodel=require('../models/blog')
const usermodel=require('../models/user')
require('express-async-errors')

blogsRouter.get('/',async(request,response)=>{
    const x= await blogmodel.find({}).populate('user',{username:1,name:1})
    response.json(x)
})

blogsRouter.get('/:id',async(request,response)=>{
    const x= await blogmodel.findById(request.params.id)
    response.json(x)
})


blogsRouter.post('/',async(request,response)=>{
    const body=request.body
    const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
    const user=await usermodel.findById(decodedToken.id)
    const blogobj={
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user:user._id
    }
    const blog=new blogmodel(blogobj)
    const x= await blog.save()
    await x.populate('user', { username: 1, name: 1, id: 1 }).execPopulate()
    user.blogs=user.blogs.concat(x.id)
    await user.save()
    response.status(201).json(x)
})

blogsRouter.delete('/:id',async(request,response)=>{
    const token = request.token
     const decodedToken = jwt.verify(token, process.env.SECRET)
     const blog=await blogmodel.findById(request.params.id)
     const user=await usermodel.findById(decodedToken.id)
     if(blog.user.toString()===user.id.toString())
     {
    await blogmodel.findByIdAndRemove(request.params.id)
    response.status(204).end()
     }
     else{
         response.status(401).json({error:"Unauthorized"})
     }
})

blogsRouter.put('/:id',async(request,response)=>{
    const body=request.body
     const blog=await blogmodel.findById(request.params.id)
        const newobj={
            title:body.title,
            author:body.author,
            url:body.url,
            likes:body.likes,
            comments:body.comments
        }
        const x=await blogmodel.findByIdAndUpdate(request.params.id,newobj,{new:true})
        await x.populate('user', { username: 1, name: 1, id: 1 }).execPopulate()
        response.json(x)
})

module.exports=blogsRouter