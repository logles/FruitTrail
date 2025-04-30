import React from 'react';
import './LoginSignup.css'

const LoginSignup = () => {
    return (
        <div className="container">
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    {/* <img src={to use if we want icons} alt=""/> */}
                    <input type="text" placeholder='name' />
                </div>
                <div className="input">
                    <input type="email" placeholder='email'/>
                </div>
                <div className="input">
                    <input type="password" placeholder='password' />
                </div>
            </div>
            <div className="forgot-password">forgot password? <span>click here</span></div>
            <div className="submit-container">
                <div className="submit">Sign Up</div>
                <div className="submit">Login</div>
            </div>
        </div>
    )
}

export default LoginSignup