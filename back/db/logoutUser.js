
module.exports = (email, Users) => {
    return new Promise((resolve, reject) => {
        console.log('Loggin user out', email)
        Users.update({ email }, { $set: {loggedIn: false}}).then(data => {
        resolve(data)
    })
})

}