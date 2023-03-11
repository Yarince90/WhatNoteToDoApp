import React, { useState, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../../components/button/Button";
import './register.css';


function Register(){
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(false);
    const [newUser, setNewUser] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
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

        if(newUser.password === newUser.confirmPassword){
            setErrorMessage(false);
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

            if(response.ok){
                auth.login(resData.userId, resData.token);
                setErrorMessage(false);
                navigate('/');
            } else {
                setErrorMessage(true);
            }
           
            } catch (err) {console.log(err);}
        } else {
            setErrorMessage(true);
        }
    }

    return(
        <Fragment>
            <form className="registration" onSubmit={registerUser} >
            <h1>Create Account</h1>                
                <input className="email"
                type="email"
                onChange={handleChange}
                name="email"
                value={newUser.email}
                placeholder="Email"
                />
                <input className="userName"
                type="input"
                onChange={handleChange}
                name="userName"
                value={newUser.userName}
                placeholder="Username"
                />
                <input className="password"
                type="password"
                onChange={handleChange}
                name="password"
                value={newUser.password}
                placeholder="Password"
                />
                <input className="password"
                type="password"
                onChange={handleChange}
                name="confirmPassword"
                value={newUser.confirmPassword}
                placeholder="Confirm Password"
                />
                {errorMessage && <p className="errorMessage">Passwords do not match. Please try again</p>}
                 <Button btnName="Register" 
                 type="submit"
                 ></Button>
            </form>
        </Fragment>
    )
}

export default Register;