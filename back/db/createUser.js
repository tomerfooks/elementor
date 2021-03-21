//CBCRYOT FOR ENCRPYTING PASSWORDS
const bcrypt = require("bcrypt")
//JWT FOR ENCODING AND DECODING TOKENS
const jwt = require("jsonwebtoken")
//FIELDS VALIDATION
const validation = require("../utils/validation")
//RETREIVES IP ADDRESS
const getIp = require("../utils/getIp")

module.exports = (email, pass, Users, req) => {
  return new Promise((resolve, reject) => {
    if (!validation("email", email))
      return reject({ err: "Bad Email Address." })

    Users.find({ email })
      .toArray()
      .then((data) => {
        // GETS THE CURRENT TIME AND DATE FOR USER REGISTRATION
        const registrationDate = new Date()
        // IF CHECKS IF USER WITH EMAIL ALREADY EXISTS
        if (data.length !== 0) {
          return reject({
            err: "User with email " + email + " is already exists",
          })
        }
        //ENCRPYTING (HASIHNG) THE PASSWORD
        bcrypt.hash(pass, 12).then((hashed) => {
          //INSERT TO MONGODB VIA API
          Users.insertOne({
            email,
            registrationDate,
            loggedIn: true,
            hashed, //THE ENCRPYTED PASSWORD
            ip: getIp(req),
            userAgent: req.get("user-agent"),
            lastUpdate: registrationDate,
            loginCount: 0,
          }).then((reply) => {
            //REMOVES PASSWORD AND ID FOR SECURITY
            delete reply.ops[0].hashed
            delete reply.ops[0]._id
            //GENERATES NEW TOKEN WITH KEY 'ELEMENTOR'
            const token = jwt.sign(JSON.stringify(reply.ops[0]), "elementor")
            //RETURNS THE NECESSARY USER DATA
            resolve({
              email: reply.ops[0].email,
              registrationDate: reply.ops[0].registrationDate,
              token,
              ip: getIp(req),
              loginCount: 0,
              userAgent: req.get("user-agent"),
            })
          })
        })
      })
  })
}
