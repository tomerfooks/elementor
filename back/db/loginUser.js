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
    //VALIDATES EMAIL FIELD
    if (!validation("email", email))
      return reject({ err: "Incorrect Email Address" })
    //SEARCHING FOR EXISTING USER WITH THIS EMAIL
    Users.find({ email })
      .toArray()
      .then((data) => {
        if (data.length === 0)
          return reject({ err: "Login failed. User not found" })
        else {
          //IF EXISTING USER FOUND, CHECKING THE USER PASSWORD
          bcrypt.compare(pass, data[0].hashed).then((result) => {
            if (!result)
              return reject("Incorrect Password. Please try again...")
            Users.update(
              { email: data[0].email },
              // increment it's property called "loginCount" by 1
              {
                $inc: { loginCount: 1 },
                $set: {
                  lastUpdate: new Date(),
                  ip: getIp(req),
                  loggedIn: true,
                },
              }
            )
            //GENERATES A TOKEN WITH ALL THE NECESSARY USER INFORMATION
            const token = jwt.sign(data[0], "elementor")
            //RETURNS ALL THE USER INFORMATION
            return resolve({
              email: data[0].email,
              token,
              ip: getIp(req),
              loggedIn: true,
              lastUpdate: new Date(),
              loginCount: data[0].loginCount || 0,
              registrationDate: data[0].registrationDate,
            })
          })
        }
      })
  })
}
