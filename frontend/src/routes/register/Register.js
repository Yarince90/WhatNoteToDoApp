import React, { useState, Fragment, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import Button from "../../components/button/Button";
import './register.css';


function Register(){
    const auth = useContext(AuthContext);
    const [newUser, setNewUser] = useState({
        userName: "",
        email: "",
        password: ""
    });

    function handleChange(e){
        const{ name, value } = e.target;
        setNewUser( prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    }
    //Send new user info to backend
    async function registerUser (event) {
        event.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: newUser.userName,
                email: newUser.email,
                password: newUser.password
            })
        });
        const resData = await response.json();
        auth.login(resData.userId, resData.token);
        } catch (err) {console.log(err);}
    }

    return(
        <Fragment>
            <form className="registration" onSubmit={registerUser} >
            <h1>Create Account</h1>
                <input className="userName"
                onChange={handleChange}
                name="userName"
                value={newUser.userName}
                placeholder="Username"
                />
                <input className="email"
                onChange={handleChange}
                name="email"
                value={newUser.email}
                placeholder="Email"
                />
                <input className="password"
                onChange={handleChange}
                name="password"
                value={newUser.password}
                placeholder="Password"
                />
                 <Button btnName="Register" 
                 type="submit"
                 ></Button>
            </form>
        </Fragment>
    )
}

export default Register;