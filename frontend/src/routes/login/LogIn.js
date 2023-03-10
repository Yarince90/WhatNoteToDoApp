import React, { useState, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import Button from "../../components/button/Button";
import './login.css';

function LogIn(){
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    function handleChange(e){
        const{ name, value } = e.target;
        setUser( prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    }

    //Send login credentials to Backend
    async function loginUser (event) {
        event.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                password: user.password
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
    }

    return(
        <Fragment>
            <form className="logIn" onSubmit={loginUser} >
            <h1>Log In</h1>
               <input className="email"
                type="email"
                onChange={handleChange}
                name="email"
                value={user.email}
                placeholder="Email"
                />
                <input className="password"
                type="password"
                onChange={handleChange}
                name="password"
                value={user.password}
                placeholder="Password"
                />
                {errorMessage && <p className="errorMessage">Invalid Credentials. Please try again</p>}
                <Button btnName="Log In"
                type="submit"
                ></Button>
            </form>
        </Fragment>
    )
}

export default LogIn;