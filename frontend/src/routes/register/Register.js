import React, { useState, Fragment, useContext } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import Button from "../../components/button/Button";
import './register.css';
import { AuthContext } from "../../context/auth-context";

function Register(){
    const auth = useContext(AuthContext);
    const [ sendRequest ] = useHttpClient();
    const [newUser, setNewUser] = useState({
        userName: "",
        email: "",
        password: ""
    });



    function handleChange(e){
        const{ name, value } = e.target;
        setNewUser(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }



    
    const registerUser = async (event) => {
        
        
           
    }





    return(
        <Fragment>
            <form className="registration" onSubmit={registerUser}>
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
                 method="post"
                 ></Button>
            </form>
        </Fragment>
    )
}

export default Register;