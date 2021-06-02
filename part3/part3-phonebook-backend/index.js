const http = require('http')
const express=require('express')
const app = express()
var morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const personsmodel=require('./models/persons')

app.use(express.static('build'))
app.use(cors())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))


app.use(express.json())

   let persons=[
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  
app.get('/api/persons',(request,response)=>{
      personsmodel.find({}).then(persons=>{
        response.json(persons)
      })
})

app.get('/info',(request,response,next)=>{
  personsmodel.countDocuments({})
  .then(count => {
    response.send(`<p>Phonebook has info for ${count} people.</p><p>${new Date()}</p>`)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id',(request,response,next)=>{
    let id=request.params.id
    personsmodel.findById(id).then(person=>{
      if(person){
      response.json(person)
      }
      else{
        response.status(404).end()
      }
    }).catch(err=>{
      console.log(err)
      next(err)
    })
})

app.delete('/api/persons/:id',(request,response,next)=>{
    personsmodel.findByIdAndRemove(request.params.id).then(()=>{
      response.status(204).end()
    }).catch(err=>{
      next(err)
    })
})



app.post('/api/persons',(request,response,next)=>{
    const body=request.body
    if (!body.name) {
        return response.status(400).json({ 
          error: 'name is missing' 
        })
      }
    else if(!body.number){
      return response.status(400).json({ 
        error: 'number is missing' 
      })
    }
    
    const x=new personsmodel({
        name:body.name,
        number:body.number
    })
    x.save().then(res=>{
        response.json(res)
    }).catch(err=>{next(err)})
})

app.put('/api/persons/:id',(request,response,next)=>{
  const body=request.body
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  }
else if(!body.number){
  return response.status(400).json({ 
    error: 'number is missing' 
  })
}
  const z={
    name: body.name,
    number: body.number
  }
  personsmodel.findByIdAndUpdate(request.params.id, z,{new:true}).then(res=>{
    response.json(res)
  }).catch(err=>{next(err)})
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })