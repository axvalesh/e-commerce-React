import React, { useEffect, useState } from "react";
import classes from './MyModal.module.css'
const MyModal = ({className,visible,children,setVisible, center=false}) => {

  const addOverflowHidden = () => {
    document.body.style.overflow = "hidden";
  };
  
  const removeOverflowHidden = () => {
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (visible) {
      addOverflowHidden();
    } else {
      removeOverflowHidden();
    }
    // Clean up the effect
    return () => {
      removeOverflowHidden();
    };
  }, [visible]);

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