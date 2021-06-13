const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const usermodel = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if(body.password.length<3)
  {
      return response.status(400).json({ error: 'password should be at least 3 characters' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new usermodel({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/',async(request,response)=>{
  const users=await usermodel.find({}).populate('blogs',{title:1,author:1,url:1})
  response.json(users)
})

usersRouter.get('/:id',async(request,response)=>{
  const user=await usermodel.findById(request.params.id).populate('blogs',{title:1,author:1,url:1})
  response.json(user)
})
module.exports = usersRouter