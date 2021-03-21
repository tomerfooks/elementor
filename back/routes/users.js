const createUser = require('../db/createUser')
const loginUser = require('../db/loginUser')
const auth = require('../utils/auth')

module.exports = (app, Users) => {
  app.get('/users', (req, res) => {
    // if(auth(req.headers))
    Users.find({ })
      .toArray()
      .then((data) => res.send(data))
      .catch((err) => res.send(err))
    // else return res.send('Not authorized. sorry')
  })

  app.get('/users/:email', (req, res) => {
    if(req.params.email)
    Users.find({email: req.params.email})
      .toArray()
      .then((data) => res.send(data))
      .catch((err) => res.send(err))
    else return res.send('Missing email..')
  })

  app.post('/users/create', (req, res) => {
    const { email, pass } = req.body
    if (email && pass)
      createUser(email, pass, Users,req)
        .then((newUser) => res.send(newUser))
        .catch((err) => res.send(err))
    else return res.send('Missing details')
  })

  app.post('/users/login', (req, res) => {
    const { email, pass } = req.body
    console.log('Loggin user ')
    if (!email || !pass) return res.send('Missing information')
    else
      loginUser(req.body.email, req.body.pass, Users,req)
        .then((reply) => res.send({ reply }))
        .catch((err) => res.send({ err }))
  })

}
