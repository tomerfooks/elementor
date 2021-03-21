
module.exports = (email, Users) => {
    return new Promise((resolve, reject) => {
        Users.update({ email }, { $set: {loggedIn: false}}).then(data => {
        resolve(data)
    })
})

}