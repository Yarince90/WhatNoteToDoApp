import React, { Fragment, useContext } from "react";
import { Outlet, Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import "./header.css";

function Header() {
    const auth = useContext(AuthContext);

    return (
        <Fragment>
            <header>
                <div className="linksContainer">
                    <div className="link-item-01">
                        <Link className="navLink" to='/'><h1>Home</h1></Link>
                    </div>
                    <div className="link-item-02">
                        <Link className="navLink" to='/noteKeeper'><h1>Note Keeper</h1></Link>
                        <Link className="navLink" to='/toDoList'><h1>To Do List</h1></Link>
                    </div>
                    {!auth.isLoggedIn ? 
                        <div className="link-item-03">
                        <Link className="navLink" to='/logIn'><h1>Login</h1></Link>
                        <Link className="navLink" to='/register'><h1>Create Account</h1></Link>
                    </div>
                     :
                    <div className="link-item-03">
                        <Link className="navLink"><h1 onClick={auth.logout} >Log Out</h1></Link>
                    </div>
                    }
                </div>
            </header>
            <Outlet />
        </Fragment>
    )
}

export default Header;