import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Context from './components/Context'
import './styles/App.scss'
import auth from './utils/auth'
import Modal from './components/pages/Modal'
import UsersList from './components/UsersList'

function App() {
  const [loggedUser, setLoggedUser] = useState({})

  //THIS FUNCTION UPDATES THE LOGGED USER IN THE CONTEXT
  const updateLoggedUser = (freshlyLoggedUser) =>
    setLoggedUser(freshlyLoggedUser)
  
  useEffect(() => {
    if (!loggedUser.token && auth()) setLoggedUser(auth())
    if (loggedUser.token) console.log('Logged In User ', loggedUser)
  }, [loggedUser])
  return (
    <div className='app'>
      <Context.Provider value={{ loggedUser, updateLoggedUser }}>
        <Context.Consumer>
          {() => (
            <Router>
              <Header props={(loggedUser, updateLoggedUser)} />
              <Switch>
                <Route
                  path='/Login'
                  render={() => (
                    <Modal props={{ title: 'Login', type: 'Login' }} />
                  )}
                />
                <Route path="/Users">
                  <UsersList/>
                </Route>
                <Route
                  path='/user/:email'
                  render={() => (
                    <Modal props={{ title: '', type: 'User' }} />
                  )}
                />
                <Route
                  path='/Signup'
                  render={() => (
                    <Modal
                      props={{
                        title:
                          'Signup to Elementor API',
                        type: 'Signup',
                      }}
                    />
                  )}
                />
              
              </Switch>
              <Footer />
            </Router>
          )}
        </Context.Consumer>
      </Context.Provider>
    </div>
  )
}

export default App
