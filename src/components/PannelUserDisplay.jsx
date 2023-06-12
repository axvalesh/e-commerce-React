import React, { useState } from "react";
import '../styles/PannelUserDisplay.css'
import MyButton from "./UI/MyButton/MyButton";

const PannelUserDisplay = ({name,role,func}) => {

    return (
      <div className="PannelUserDisplay">
        <div className="PannelUserDisplay__info">
           <h2>Name: {name}</h2>
           <div>Roles:<span>{role.map((item,index) => <h3 className="PannelUserDisplay__roles-text" key={index}>{item}</h3> )}</span></div>
        </div>
        <MyButton onClick={() => func(name)}>GIVE ADMIN ROLE</MyButton>
      </div>
    );
};

export default PannelUserDisplay;