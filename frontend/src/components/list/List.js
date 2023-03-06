import React, { Fragment, useState } from "react";
import ListItem from "../listItem/ListItem";
import { useHttpClient } from "../../hooks/http-hook";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import '../list/list.css';

function List(props) {
    const { sendRequest } = useHttpClient();
    const [isExpanded, setExpanded] = useState(false);
    const [listItems, loadItems] = useState([]);

    function handleClick() {
        isExpanded ?
        setExpanded(false)
        :
        setExpanded(true);
        loadListItems(props.id);
    }

    //Load List Items =---------------------------------------------------------
async function loadListItems(id) {
    try {
        const resData = await sendRequest(
            `http://localhost:5000/api/item/user/${id}`
        );
        loadItems(resData.listItems);
        console.log(resData.listItems);
    } catch (err) {console.log(err);}
}


    return(
        <div className="toDoList">
            <h1>{props.title}</h1>
            {isExpanded &&
             <Fragment>
                {listItems.map((items) => {
                    return(
                        <ListItem 
                        key={items._id}
                        id={items._id}
                        itemName={items.itemName}
                        />
                    )
                })}
             </Fragment>
            }
            <button onClick={handleClick}>
                {!isExpanded ? 
                    <ExpandMoreIcon /> 
                    :
                    <ExpandLessIcon />
                }
            </button>
        </div>
    )
}

export default List;