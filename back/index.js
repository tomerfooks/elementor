require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb')
const app = require('express')()
app.use(require('cors')())
app.use(require('body-parser').json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.get('/', (req, res) => res.send('Hello Elementor!'))

let mongoUrl = process.env.mongourl || 'mongodb://mongo:27017'

const server = async () => {
  const Users = await MongoClient.connect(mongoUrl, {
    useUnifiedTopology: true,
  })
  require('./routes/users')(app, Users.db('elementor').collection('users'))
}
try {
  server()
} catch (e) {
  console.log(e)
}

app.listen(4000, () => console.log('Server running on port 4000'))
