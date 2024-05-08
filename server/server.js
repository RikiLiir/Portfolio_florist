const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const mongodb = require('mongodb')
const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const app = express()
const multer  = require('multer')

const readFile = (mimetype) => {
  let suffix = ''

  if (mimetype === 'image/jpeg') {
    suffix = '.jpg'
  } else if (mimetype === 'image/png') {
    suffix = '.png'
  }

  return suffix
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './image')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + readFile(file.mimetype))
    }
  })
 
const upload = multer({ storage })

dotenv.config()

const UserSchema = new mongoose.Schema({
  _id: String,
  username: String,
  password: String
}, {timestamps: true})

const PostSchema = new mongoose.Schema({
  _id: String,
  name: String,
  description: String,
  image: String,
  type: String
}, {timestamps: true})


const generateDB = () => {
  mongoose.connect(process.env.MONGODB_URI || '', { dbName: 'Portfolio' })
    .then(() => console.log('Connected to Database'))
    .catch((error) => console.error('Error connecting to Database', error))

    mongoose.model('Posts', PostSchema)
    mongoose.model('Users', UserSchema)
    // mongoose.model(RESTFUL.DB_COLLECTIONS.POSTS, PostScheme)
}

const verify = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1]

  if (!token) {
    res.status(400).send('Token not present')
  } else {
    jwt.verify(token, process.env.API_SECRET, (err, user) => {
      if (err) {
        res.status(403).send('Token invalid')
      } else {
        next()
      }
    })
  }
}

generateDB()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/image", express.static("./image"))

app.post('/register', async (req, res) => {
  const { username, password } = req.body
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const UsersCollection = mongoose.model('Users')
  // CHECK FOR DUPLICATE USERNAME
  const userExists = await UsersCollection.exists({ username: username }).exec()

  if (!!userExists) {
    return res.status(400).json({
      type: 'error',
      message: 'This username already exists.'
    })
  } else {
    // Add user to database
    await UsersCollection.create({
      _id: new mongodb.ObjectId(),
      username,
      password: hashedPassword,
    })
    res.status(201).send()
  }
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    // fetch user list
    const UsersCollection = mongoose.model('Users')
    const user = await UsersCollection.findOne({ username })

    if (!user) {
      return response.status(404).json({
        type: 'error',
        message: 'Unsuccessful login.'
      })
    }
  
    const account = user
  
    if (!!password && !!account.password && await bcrypt.compare(password, account.password)) {
      const tokenObj = {
        username
      }

      const generateSignToken = (user, options, secret) => {
        const { expiresIn } = options
        return jwt.sign(user, secret, { expiresIn })
      }

      const accessToken = generateSignToken(tokenObj, { expiresIn: '15m' }, process.env.API_SECRET)
      const responseObj = {
        accessToken
      }

      return res.json(responseObj)
    } else {
      return response.status(401).json({
        type: 'error',
        message: 'Unsuccessful login.'
      })
    }
  } catch(error) {
    return response.status(400).json({ error })
  }
})

app.post('/upload',
  verify,
  upload.single('file'),
  async (req, res) => {
    try {
      const PostsCollection = mongoose.model('Posts')
      const posts = await PostsCollection.findOne({ name: req.body.name}).exec()
  
      if (!!posts) {
        return res.status(400).json({
          type: 'error',
          message: 'This post already exists.'
        })
      } else {
        const newPost = {
          _id: new mongodb.ObjectId(),
          name: req.body.name,
          description: req.body.description,
          type: req.body.type,
          image: res.req.file.filename,
        }
        PostsCollection.create(newPost)
        return res.json(newPost)
      }
    } catch (error) {
      console.error(error)
    }
  }
)

app.get('/posts', async (req, res) => {
  // FETCH POSTS

  const PostsCollection = mongoose.model('Posts')
  const posts = await PostsCollection.find({type: req.query.type}).exec()
  res.json({posts})
})

app.listen(4000)

