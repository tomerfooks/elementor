module.exports = (email) => {
    return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/users/logout/'+email, {
        method: 'POST',
        mode: 'cors',
    })
        .then((json) => json.json())
        .then((data) => {
            if (data.hasOwnProperty('err'))
                return (document.querySelector('.modal p').innerHTML = 'Login failed. Please try again')
        })
    })

    }
