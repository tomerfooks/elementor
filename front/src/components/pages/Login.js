import React, { useContext, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import Context from "../Context"

export default function Login() {
  //USING THE APP'S CONTEXT
  const context = useContext(Context)

  //STATES FOR BASIC USER INPUTS AND ERROR
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")

  //REACT HOOK FOR NAVIGATION AND INTERACTING WITH THE BROWSER HISTORY
  const history = useHistory()
  const loginUser = () => {
    const apiUrl = process.env.apiurl || "http://localhost:4000"

    //FETCHING DATA FROM THE API USING A HTTP POST REQUEST
    fetch(apiUrl + "/users/login", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      //STRINGFYING ALL NECESSARY DATA TO JSON
      body: JSON.stringify({ email, pass }),
    })
      .then((json) => json.json())
      .then((data) => {
        if (data.err) return setError("Wrong password")
        //UPDATES THE LOGGED USER IN THE APP CONTEXT USING A FUNCTION
        context.updateLoggedUser(data.reply)
        //NAVIGATING TO USERSLIST ROUTE
        history.push("/Users")
      })
  }

  return (
    <div className="login">
      <p>
        Login using your email and password. If you are not a member yet, You
        can
        <Link to="/Signup"> sign-up</Link>
      </p>
      <input
        id="email"
        value={email}
        placeholder={"Email Address"}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
      />
      <input
        id="pass"
        value={pass}
        placeholder={"Password"}
        onChange={(e) => setPass(e.target.value)}
        type="password"
      />
      <button onClick={loginUser}>Login</button>
      <button
        className="signupButton"
        onClick={() => {
          history.push("/Signup")
        }}>
        Not a member yet? Sign-up
      </button>
      <br />
      <br />
      {error}
    </div>
  )
}
