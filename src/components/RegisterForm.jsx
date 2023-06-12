import React, { useContext, useRef, useState } from "react";
import MyButton from "./UI/MyButton/MyButton";
import '../styles/LoginForm.css'
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../main";
import { USER, addUserAction } from "../store/usersReducer";




const RegisterForm = ({setShow}) => {

    const name = useRef()
    const password = useRef()
    const users = useSelector(state => state.users.users)
    const dispath = useDispatch()
    const [errorMessage, setErrorMessage] = useState("");

    function validateForm(e) {
        e.preventDefault()
        const nameValue = name.current.value
        const passwordValue = password.current.value



        if(nameValue && passwordValue) {

            if(nameValue.length > 3) {
                const isSuchName = users.some(user => user.name === nameValue)

                if(isSuchName) {
                    setErrorMessage("Sorry, but this name is already in use");
                } else {
                    setErrorMessage('')
                    dispath(addUserAction({name: nameValue, password: passwordValue, role: [USER]}))
                    e.target.classList.add('succesfulRegister')
                }
            }
        }
        else {
            e.target.classList.add('inputIsEmpty')
        }
    }
    return (
        <div className="loginForm__content">
            <h2>Register form</h2>
            <form className="loginForm">
                <input ref={name} className="loginForm__input-name" type="text" />
                <input ref={password} className="loginForm__input-password" type="password" />
                <MyButton onClick={(e) => validateForm(e)}>Register</MyButton>
                <p className="errorText">{errorMessage}</p>
                <h3 onClick={() => setShow(false)} style={{textAlign: 'center'}}>Login</h3>
            </form>
        </div>
    );
};


export default RegisterForm;