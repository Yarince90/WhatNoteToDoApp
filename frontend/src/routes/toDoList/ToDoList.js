import React, { useState, Fragment, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import List from "../../components/list/List";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import '../toDoList/toDoList.css';


function ToDoList(props) {
    const auth = useContext(AuthContext);
    const { sendRequest } = useHttpClient();
    const [isExpanded, setExpanded] = useState(false);
    const [userLists, loadUserLists] = useState([]);
    const [list, setList] = useState({
        title: "",
        items: []
    })
    let isFocused = false;

//Handle Create list area text change =-----------------------------------------
function handleChange(e){
    const{ name, value } = e.target;
    setList(prevList => {
        return {
            ...prevList,
            [name]: value
        };
    });
}

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

    //Add To DO List to user DB=---------------------------------------------------------
    async function submitList(event) {
        try{
            let listData = JSON.stringify({
                title: list.title,
                items: [],
                creator: auth.userId
            });

            await sendRequest(`http://localhost:5000/api/toDoList/addList`,
            'POST', listData,
            {'Content-Type': 'application/json'}
            );

            loadUserLists(prevList => {
                return [...prevList, list];
            });
        }catch(err){console.log(err);}
        setList({
            title: ""
        });
        event.preventDefault();
    }

    // Delete List from DB =---------------------------------------------------------
    async function deleteList(id) {
        try{
           const resData = await sendRequest(
            `http://localhost:5000/api/toDoList/user/${id}`,
            'DELETE', null,
            {'Content-Type': 'application/json'}
           );
           loadUserLists(resData.userLists);
        } catch (err) {console.log(err);}
    }


  // Handle Focus for Create Note area (expand and retract rows) =------------------
  document.body.addEventListener('click', function(e){
    if (e.target.classList.contains('createList')){
      isFocused = true;
    }
    else {
      isFocused = false;
      setExpanded(false);
    }
    })
    function setChange() {
        isFocused = true;
    }
  function handleFocus(){
    if(isFocused){
      setExpanded(true);
    }}

    return(
        <Fragment>
            {/* Create List Area */}
            <form className="createList">
            <input className="createList"
            name="title"
            onChange={handleChange}
            value={list.title}
            onClick={handleFocus}
            onMouseOver={setChange}
            placeholder="Add List Title ..."
            />
             <Zoom in={isExpanded}>
              <Fab onClick={submitList}>
                <AddCircleRoundedIcon />
              </Fab>
            </Zoom>
            </form>
            {userLists.map((listItem) => {
                return(
                    <List 
                    key={listItem._id}
                    id={listItem._id}
                    title={listItem.title}
                    onDelete={deleteList}
                    />
                )
            })}
        </Fragment>
    )
}

export default ToDoList;