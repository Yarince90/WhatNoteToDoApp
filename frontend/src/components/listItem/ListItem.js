import React from "react";
import '../listItem/listItem.css';

function ListItem(props) {

    return(
        <div className="listItems">
            <p className="item">{props.itemName}</p>
        </div>
    )
}

export default ListItem;