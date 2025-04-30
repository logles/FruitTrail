import React from 'react';
import { useState } from 'react';
import './LoginSignup.css'

const LoginSignup = () => {

    const [action, setAction] = useState("Sign Up");

    return (
        
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {/* action for hiding the name field on the login portion */}
                {action === "Login" ? <div></div> : <div className="input">
                    <input type="text" placeholder='name' />
                </div>}
                <div className="input">
                    <input type="email" placeholder='email' />
                </div>
                <div className="input">
                    <input type="password" placeholder='password' />
                </div>
            </div>
            {action === "Sign Up" ? <div></div> : <div className="forgot-password">forgot password? <span>click here</span></div>}
            <div className="submit-container">
                {/* action that highlights the button for the page you are on */}
                <div className={action === "Login" ? "submit grey" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit grey" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
            </div>
        </div>
    )
}

export default LoginSignup