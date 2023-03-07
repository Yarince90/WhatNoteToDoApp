import React, { useState, Fragment, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import List from "../../components/list/List";


function ToDoList() {
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const [userLists, loadUserLists] = useState([]);

//Load To Do lists from DB =---------------------------------------------------------
    useEffect(() => {
        const fetchLists = async () => {
            try{
                const resData = await sendRequest(
                    `http://localhost:5000/api/toDoList/user/${auth.userId}`
                )
                loadUserLists(resData.userLists);
            }catch(err){console.log(err)}
        };
        fetchLists();
    }, [sendRequest, auth.userId]);

    return(
        <Fragment>
            {userLists.map((listItem) => {
                return(
                    <List 
                    key={listItem._id}
                    id={listItem._id}
                    title={listItem.title}
                    />
                )
            })}
        </Fragment>
    )
}

export default ToDoList;