import React, { Fragment } from "react";
import Button from "../../components/button/Button";
import './register.css';

function Register(){
    return(
        <Fragment>
            <form className="registration">
            <h1>Create Account</h1>
                <input className="userName"
                name="userName"
                // onChange={handleChange}
                // value={user.userName}
                placeholder="Username"
                />
                <input className="email"
                name="email"
                // onChange={handleChange}
                // value={user.email}
                placeholder="Email"
                />
                  <input className="password"
                name="password"
                // onChange={handleChange}
                // value={user.email}
                placeholder="Password"
                />
                 <Button btnName="Register"></Button>
            </form>
        </Fragment>
    )
}

export default Register;