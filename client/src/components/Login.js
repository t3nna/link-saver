import React, {useState} from 'react';
import axios from "axios";


function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/login', {username, password})
            .then(res => {
                console.log(res.data)
                props.history.push('/')
            }
            )
            .catch(err => console.log(err))
    }

    const handleRequest =()=>{
        axios.get('http://localhost:4000/user', {withCredentials: true})

            .then(res => console.log(res))
    }


    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" name="username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <br/>Enter Password:<br/>
                <input type="password" name="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <button>Submit</button>
            </form>

            <button onClick={handleRequest}>
                get user data
            </button>
        </div>
    );
}

export default Login;
