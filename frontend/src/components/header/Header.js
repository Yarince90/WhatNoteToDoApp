import React, { Fragment } from "react";
import { Outlet, Link } from 'react-router-dom';
import "./header.css";

function Header() {
    return (
        <Fragment>
            <header>
                <Link to='/'>
                    <div className="logoContainer">
                        Home
                    </div>
                </Link>
                <div className="linksContainer">
                    <Link className="navLink" to='/noteKeeper'>Note Keeper</Link>
                    <Link className="navLink" to='/toDoList'>To Do List</Link>
                    <Link className="navLink" to='/logIn'>Login</Link>
                    <Link className="navLink" to='/register'>Register</Link>
                </div>
            </header>
            <Outlet />
        </Fragment>
    )
}

export default Header;