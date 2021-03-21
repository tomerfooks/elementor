import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Animate } from 'react-simple-animate'
import Context from '../Context'

import Login from './Login'
import Signup from './Signup'
import User from '../User'


export default function Modal(props) {
  const { type, title } = props.props
  const history = useHistory()
  const context = useContext(Context)
  const [toggleModal, setToggleModal] = useState(true)
  
    useEffect(() => { }, [])
    
    return (
    <div>
      {toggleModal ? (
        <div className='modal'>
          <Animate
            play={true}
            end={{ marginTop: '0px', opacity: 1 }}
            start={{ marginTop: '100px', opacity: 0 }}>
            <div className='wrapper'>
              <div
                onClick={() => {
                  setToggleModal(false)
                  history.push('/')
                }}
                className='close'>
                x
              </div>
              <h3>{title}</h3>
              {type === 'Login' ? <Login /> : null}
              {type === 'Signup' ? <Signup /> : null}
              {type === 'User' ? <User /> : null}

            </div>
          </Animate>
        </div>
      ) : null}
    </div>
  )
}