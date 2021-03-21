import React, { useContext, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Context from '../Context'
require('dotenv').config()

export default function Login() {
	const context = useContext(Context)
	const [ email, setEmail ] = useState('')
	const [ pass, setPass ] = useState('')
	const [error,setError] = useState('')
	const history = useHistory()

	const loginUser = () => {
		console.log('Logging in...')
		const apiUrl = 'http://localhost:4000'
		fetch(apiUrl + '/users/login', {
			method: 'POST',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, pass })
		})
			.then((json) => json.json())
			.then((data) => {
				if(data.err) return setError('Wrong password')
				console.log('Logged User: ',data.reply)
				context.updateLoggedUser(data.reply)
				history.push('/Users')
			})
	}

	return (
		<div className="login">
			<p>
				Login using your email and password. If you are not a member yet, You can
				<Link to="/Signup"> sign-up</Link>
			</p>
			<input
				id="email"
				value={email}
				placeholder={'Email Address'}
				onChange={(e) => setEmail(e.target.value)}
				type="text"
			/>
			<input
				id="pass"
				value={pass}
				placeholder={'Password'}
				onChange={(e) => setPass(e.target.value)}
				type="password"
			/>
			<button onClick={loginUser}>Login</button>
			<button
				className="signupButton"
				onClick={() => {
					history.push('/Signup')
				}}
			>
				Not a member yet? Sign-up
			</button>
			<br />
			<br />
			{error}
		</div>
	)
}