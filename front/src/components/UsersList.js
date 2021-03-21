import React,{useEffect,useState, useContext} from 'react'
import Context from './Context'
import { useHistory } from "react-router-dom";

export default function UsersList() {
    const context = useContext(Context)
    const [users, setUsers] = useState([])
    const [error,setError] = useState('')
    const apiUrl = 'http://localhost:4000'
    const history = useHistory()

    const recentlyLoggedIn = (user) => {
        const now = new Date();
        const lastUpdate = new Date(user.lastUpdate);
        const diffMs = (lastUpdate - now); // milliseconds between now & Christmas
        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        console.log('Last login was ', diffMins, ' minutes ago')
        return diffMins
    }

    useEffect(() => {
        if(context.loggedUser.email && users.length==0)
        fetch(apiUrl + '/users', {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json', 'Authorization': context.loggedUser.token }
          })
            .then((json) => json.json())
            .then((data) => {
                setUsers(data)
                setTimeout(()=>setUsers([]),5000)
            })
            .catch((err) => console.log(err))
     },[users])
    return (
        <div className="UsersList">
            <br />
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h2>Recently Logged Users List (Past 5 mintues)</h2>
            {users.map(user =>
                <div key={ user.registrationDate}className="user"><h3 onClick={(e)=>history.push('/user/'+ e.target.innerText) } >{recentlyLoggedIn(user)>=-10 ?user.email:''}</h3></div>
            )}
            {error}
        </div>
    )
}
