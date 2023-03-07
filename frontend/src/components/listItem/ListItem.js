import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import '../listItem/listItem.css';

function ListItem(props) {
    const [isChecked, setChecked] = useState(false);

    const markedDone = () => {
        setChecked(true); 
    }

    const handleClick = () => {
        props.onDelete(props.id);
    }
    
    return(
        <div className="listItems">
            
                {!isChecked ?
                <p className="item">{props.itemName} 
                <input type="checkbox" 
                className="checkBox" 
                name="checkbox"
                value={props.itemName}
                onChange={markedDone} 
                />
                </p>
                :
                <p className="doneItem">{props.itemName} 
                <div className="deleteIcon" onClick={handleClick}>
                    <DeleteIcon /> 
                </div>                
                </p>
            }
        </div>        
        )
}

export default ListItem;