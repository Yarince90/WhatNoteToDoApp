import React, { Fragment } from "react";
import "./button.css";

function Button(props){
    



    return(
        <Fragment>
            <button type="button" className="btn-class"><p>{props.btnName}</p></button>
        </Fragment>    
    )
}

export default Button;