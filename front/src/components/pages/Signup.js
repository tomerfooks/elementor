import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";

import Context from '../Context'
import validation from '../../utils/validation'

export default function Signup() {
  const context = useContext(Context)
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [pass2, setPass2] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const checkout = (e) => {
    e.preventDefault()
    if (!validation('email', email))
      return setError('Pleaes enter a correct email address')
    else setError('')

    if (!validation('password', pass))
      return setError(
        'Choose a 8-15 characters password with at least 1 special '
      )
    else setError('')

    if (pass != pass2) return setError('No Passwords Match. Please type again')
    else setError('')

    console.log('Creating User...')
    let apiUrl = process.env.apiurl || 'http://localhost:4000'

    fetch(apiUrl + '/users/create', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pass }),
    })
      .then((json) => json.json())
      .then((data) => {
        if (data.hasOwnProperty('err')) return setError(<p>{data.err}</p>)
        console.log(data)
        if (data.hasOwnProperty('token')) {
          context.updateLoggedUser(data)
          setError('Signed up succesfully')
          history.push('/Users')

        } else
          setError(
            'There was a problem with your registration. '
          )
      })
      .catch((err) => console.log(err))
  }
  useEffect(() => {}, [error])
  return (
    <div className='signup'>
          <form>
            <input
              id='email'
              value={email}
              placeholder={'Email Address'}
              onChange={(e) => setEmail(e.target.value)}
              type='text'
            />
            <input
              id='pass'
              value={pass}
              placeholder={'Password'}
              onChange={(e) => setPass(e.target.value)}
              type='password'
            />
            <input
              id='pass2'
              value={pass2}
              placeholder={'Enter Password Again'}
              onChange={(e) => setPass2(e.target.value)}
              type='password'
            />

            <button
              className={email && pass && pass2 ? '' : 'disabled'}
              onClick={checkout}>
          CONTINUE
            </button>
        <h6>{ error}</h6>
        </form>
    </div>
  )
}
