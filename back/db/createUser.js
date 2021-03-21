const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validation = require('../utils/validation')
const getIp = require('../utils/getIp')
module.exports = (email, pass, Users, req) => {
  return new Promise((resolve, reject) => {
    if (!validation('email', email))
      return reject({ err: 'Bad Email Address.' })
    const role = 'customer'
    Users.find({ email })
      .toArray()
      .then((data) => {
        const registrationDate = new Date()
        console.log('Creating user..', email, pass)
        if (data.length !== 0) {
          return reject({
            err: 'User with email ' + email + ' is already exists',
          })
        }
        console.log('Trying to register...')
        bcrypt.hash(pass, 12).then((hashed) => {
          Users.insertOne({
            email,
            registrationDate,
            hashed,
            ip: getIp(req),
            userAgent: req.get('user-agent'),
            lastUpdate:registrationDate,
            loginCount: 0
          }).then((reply) => {
            console.log('User added succesfully ', reply.ops[0])
            delete reply.ops[0].hashed
            delete reply.ops[0]._id

            const token = jwt.sign(JSON.stringify(reply.ops[0]), 'elementor')
            console.log('token',token)
            resolve({
              email: reply.ops[0].email,
              registrationDate: reply.ops[0].registrationDate,
              token,
              ip: getIp(req),
              loginCount: 0,
              userAgent: req.get('user-agent')
            })

            

          })
        })
      })
  })
}
