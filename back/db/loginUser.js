const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const getIp = require('../utils/getIp')
const validation = require('../utils/validation')

module.exports = (email, pass, Users,req) => {
  return new Promise((resolve, reject) => {
    if (!validation('email', email))
    return reject({ err: 'Incorrect Email Address' })
    Users.find({ email })
      .toArray()
      .then((data) => {
        if (data.length === 0)
          return reject({ err: 'Login failed. User not found' })
        else {
          bcrypt.compare(pass, data[0].hashed).then((result) => {
            if (!result)
              return reject('Incorrect Password. Please try again...')
              Users.update(
                { email: data[0].email },
                // increment it's property called "loginCount" by 1
                { $inc: { loginCount: 1 }, $set: { lastUpdate: new Date(), ip: getIp(req), loggedIn: true } }
            );
            const token = jwt.sign(data[0], 'elementor')

            return resolve({
              email: data[0].email,
              token,
              ip: getIp(req),
              lastUpdate: new Date(),
              loginCount:data[0].loginCount || 0,
              registrationDate: data[0].registrationDate,
            })
          })
        }
      })
  })
}
