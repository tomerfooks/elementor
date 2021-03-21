module.exports = (email) => {
    return new Promise((resolve, reject) => {
    fetch('http://localhost:4000/users/logout', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ email})
    })
        .then((json) => json.json())
        .then((data) => {
            if (data.hasOwnProperty('err'))
                return (document.querySelector('.modal p').innerHTML = 'Login failed. Please try again')
        })
    })

    }
