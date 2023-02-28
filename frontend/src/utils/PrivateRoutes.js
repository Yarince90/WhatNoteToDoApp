import React, { useContext } from "react";
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from "../context/auth-context";

const PrivateRoutes = () => {
    const auth = useContext(AuthContext);

    return(
        auth.token ? <Outlet/> : <Navigate to="/register"/>
    )
}

export default PrivateRoutes;