import React from "react";

function LabelComponent(props){
   return(
       <label className={props.className}>{props.textName}</label>
   )
}

export default LabelComponent;