import React from "react";
 
function ButtonComponent(props){
      return(
            <button onClick={props.handleClick} className="btn btn-success">{props.BtnText}</button>
       );
}
export default ButtonComponent;