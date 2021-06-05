const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uniqueValidator = require('mongoose-unique-validator')
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =`mongodb+srv://tanuj:${password}@cluster0.jrrsr.mongodb.net/blogdb?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
  const userSchema = new mongoose.Schema({
    username: {
      type:String,
      unique:true
    },
    name: String,
    passwordHash: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blogs'
      }
    ],
  })
  
  userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash
    }
  })
  userSchema.plugin(uniqueValidator)
  const usermodel = mongoose.model('users', userSchema)
const fun=async()=>{
  const saltRounds = 10
  const passwordHash = await bcrypt.hash('tanuj123', saltRounds)

  const user = new usermodel({
    username: "tanuj",
    name: "tanuj",
    passwordHash,
  })

  const savedUser = await user.save()
  console.log(savedUser.toJSON())
}
 fun()
