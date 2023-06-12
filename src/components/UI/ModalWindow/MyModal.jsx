import React, { useState } from "react";
import classes from './MyModal.module.css'
const MyModal = ({className,visible,children,setVisible, center=false}) => {

    const modalBackground = [classes.modal_background]
    if(visible) {
      center 
      ?
        modalBackground.push(classes.activeCenter)
      :
        modalBackground.push(classes.activeEnd)
    }
    return (
      <div className={modalBackground.join(' ')} onClick={() => setVisible(false)}>
           <div style={{height: center && 'auto'}} className={`${classes.cartModalContent} ${className}`} onClick={e => e.stopPropagation()}>
                {children}
           </div>
      </div>
    );
};

export default MyModal;