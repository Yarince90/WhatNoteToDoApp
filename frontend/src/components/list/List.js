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
    const [item, setItem] = useState({
        itemName: ""
     });

    //Handle change for add add new item
    function handleChange(e){
        const{ name, value } = e.target;
        setItem(prevItem => {
            return {
                ...prevItem,
                [name]: value
            };
        });
    }

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
                `http://localhost:5000/api/item/list/${id}`
            );
            loadItems(resData.listItems);
        } catch (err) {console.log(err);}
    }

    //Add new item to list =---------------------------------------------------------
    async function addItem(event) {
        try{
            let itemData = JSON.stringify({
                itemName: item.itemName,
                creator: props.id
            });

            await sendRequest('http://localhost:5000/api/item/addItem',
            'POST', itemData,
            {'Content-Type': 'application/json'}
            );

            loadItems(prevItems => {
                return [...prevItems, item];
            });
        } catch (err) {console.log(err);}
       
        setItem({
            itemName: ""
        });
        event.preventDefault();
    }

    //Delete item from list =---------------------------------------------------------
    async function deleteItem(id) {
        try {
            const resData = await sendRequest(
                `http://localhost:5000/api/item/list/${id}`,
                'DELETE', null,
                {'Content-Type': 'application/json'}
            );
            loadItems(resData.items);
        }catch(err){console.log(err);}
    }

    //Delete List =---------------------------------------------------------
    function handleDeleteList() {
        props.onDelete(props.id);
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
                        onDelete={deleteItem}
                        />
                    )
                })}
                <form>
                    <input className="addNewItem"
                        name="itemName"
                        onChange={handleChange}
                        value={item.itemName}
                        placeholder="Add new Item"
                    />
                    <div className="addItem" onClick={addItem}>
                        Add
                    </div>
                </form>
                <div className="deleteButton" onClick={handleDeleteList}>
                    Delete List
                </div>
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