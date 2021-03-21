const https = require('https')
describe('User Login Test', () => {

    const email = "tomer@fooks.co.il"
    const pass = 'Tomer123!'

    it('Testing User Login..', () => {

        const options = {
            hostname: 'http://localhost:4000/users/login"',
            path: '/users/login',
            port: 4000,
            method: 'POST',
            body: JSON.stringify({
                email,
                pass
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const req = https.request(options, res => {
            res.on('data', d => {
                expect(data.body).toHaveProperty('token')
            })
        })
    })
})