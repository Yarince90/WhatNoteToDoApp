import React, { Fragment } from "react";
import Button from "../../components/button/Button";
import './login.css';

function LogIn(){
    return(
        <Fragment>
            <form className="logIn">
            <h1>Log In</h1>
                <input className="userName"
                name="userName"
                // onChange={handleChange}
                // value={user.userName}
                placeholder="Username / email"
                />
                  <input className="password"
                name="password"
                // onChange={handleChange}
                // value={user.email}
                placeholder="Password"
                />
                <Button btnName="Log In"></Button>
            </form>
        </Fragment>
    )
}

export default LogIn;