import React,{useEffect,useState,useContext} from 'react'
import { useParams } from "react-router-dom";
import Context from '../components/Context'
export default function User() {
    const {email } = useParams()
    const [user,setUser] = useState()
    const context = useContext(Context)
    const apiUrl = process.env.apiurl || 'http://localhost:4000'
    
    useEffect(() => {
        fetch(apiUrl + '/users/'+email, {
			method: 'GET',
			mode: 'cors',
			headers: { 'Content-Type': 'application/json' },
		})
			.then((json) => json.json())
            .then((data) => {
                setUser(data[0])
			})

    },[])
    return (
        <div className="User">
            <h3>{email} </h3>
            {user && context.loggedUser.email ? <div className="user">
                <h6>Registration Date: {user.registrationDate}</h6>
                <h6>Login Count: {user.loginCount}</h6>
                <h6>IP: {user.ip}</h6>
                <h6>User Agent: {user.userAgent}</h6>
                <h6>Last Login: {user.lastUpdate}</h6>
            </div> : 'Loading.. If you are not logged in, please do' }
        </div>
    )
}
