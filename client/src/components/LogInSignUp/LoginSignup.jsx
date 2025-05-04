import React from 'react';
import { useState } from 'react';
import './LoginSignup.css'
import { ADD_USER } from '@/utils/mutations';
import { LOGIN_USER } from '@/utils/mutations';
import { useMutation } from '@apollo/client';

const LoginSignup = () => {
    const [addUser] = useMutation(ADD_USER);
    const [logInUser] = useMutation(LOGIN_USER);
    const [action, setAction] = useState("Sign Up");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function handleSubmit() {
        try {


            if (action == "Sign Up") {
                const response = await addUser({
                    variables: {
                        "username": username,
                        "email": email,
                        "password": password
                    }

                })
                if (response?.data?.addUser?.token) {
                    window.location.href = "/MapPage"
                }

            }
            else {
                const response = await logInUser({
                    variables: {
                        "username": username,
                        "password": password
                    }
                })
                if (response?.data?.login?.token) {
                    window.location.href = "/MapPage"
                }

            }
        } catch (err) {
            alert("error")
            console.log(err)
        }
    }
    return (

        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {/* action for hiding the name field on the login portion */}
                <div className="input">
                    {/* {action === "Login" ? <div></div> : <div className="input"> */}
                    <input type="text" placeholder='username' value={username} onChange={(event) => {
                        setUserName(event.target.value)
                    }} />
                </div>
                {/* <div className="input">  */}
                {action === "Login" ? <div></div> : <div className="input">
                    <input type="email" placeholder='email' value={email} onChange={(event) => {
                        setEmail(event.target.value)
                    }} />
                </div>}
                <div className="input">
                    <input type="password" placeholder='password' value={password} onChange={(event) => {
                        setPassword(event.target.value)
                    }} />
                </div>
            </div>
            {action === "Sign Up" ? <div></div> : <div className="forgot-password">forgot password? <span>click here</span></div>}
            <div className="submit-container">
                <button onClick={handleSubmit} className="submit">Submit</button>

                {/* action that highlights the button for the page you are on */}
                {
                    action == "Login" ?
                        (<div className={action === "Login" ? "submit" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                        ) : null
                }
                {
                    action == "Sign Up" ?
                        (<div className={action === "Sign Up" ? "submit" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
                        ) : null
                }
            </div>
        </div>
    )
}

export default LoginSignup