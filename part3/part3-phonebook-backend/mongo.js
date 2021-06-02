const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =`mongodb+srv://tanuj:${password}@cluster0.jrrsr.mongodb.net/phonebookapp?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const personSchema = new mongoose.Schema({
  name:String,
  number:String
})
 const Person=mongoose.model('Persons',personSchema)


 if(password && name && number)
 {
 const person=new Person({
   name:name,
   number:number
 })
 person.save().then(x=>{
  console.log(`added ${x.name} ${x.number} to phonebook`)
   mongoose.connection.close()
 })}
 else{
   Person.find({}).then(person=>{
    console.log('PhoneBook:')
     person.forEach(x=>{console.log(`${x.name} ${x.number}`)})
     mongoose.connection.close()
   })
 }
