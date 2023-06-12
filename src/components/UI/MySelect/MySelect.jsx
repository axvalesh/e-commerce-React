import React, { useState } from "react";
import classes from './MySelect.module.css'
const MySelect = ({value,defaultValue,options,onChange}) => {

    return (
      <select className={classes.select} value={value} onChange={event => onChange(event.target.value)}>
           <option className={classes.option} value="all">{defaultValue}</option>
           {options.map((option,index) => 
           <option className={classes.option} value={option.value} key={index}>{option.name}</option>
           )}
      </select>
    );
};

export default MySelect;