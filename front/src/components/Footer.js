import React from 'react'
import { useHistory } from 'react-router-dom'
export default function Footer() {
  const history = useHistory()
  const goTo = (path) => history.push(path)

  return (
    <div className='footer'>
      <div className='credits'>
      </div>
    </div>
  )
}
