import React, { useContext, useRef, useState } from "react";
import MyButton from "./UI/MyButton/MyButton";
import '../styles/LoginForm.css'
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../main";
import RegisterForm from "./RegisterForm";
import { setCookie } from "../scripts/cookie";







const LoginForm = ({setModal}) => {

    const name = useRef()
    const password = useRef()
    const users = useSelector(state => state.users.users)
    const {user,setUser} = useContext(UserContext)

    const [showRegisterForm, setShowRegisterForm] = useState(false)
    

    function validateForm(e) {
        e.preventDefault()
        const nameValue = name.current.value
        const passwordValue = password.current.value



        if(nameValue && passwordValue) {
            const userItem = users.map(user => {
                if(user.name === nameValue && user.password === passwordValue) {
                    return user
                } 

            }).filter(user => user !== undefined)
            console.log(userItem);
            if(userItem && userItem.length > 0) {
                localStorage.setItem('isAuth', true)
                setModal(false)
                setUser(userItem)
                setCookie('userName', userItem[0].name, 1)
                
            } else {
                e.target.classList.add('notSuchUser')
            }


        }

        else {
            e.target.classList.add('inputIsEmpty')
        }
    }
    return (
        <>
            {showRegisterForm ? 
                (
                    <RegisterForm setShow={setShowRegisterForm}/>
                ) : 
                (
                <div className="loginForm__content">
                    <h2>Login form</h2>
                    <form className="loginForm">
                        <input ref={name} className="loginForm__input-name" type="text" />
                        <input ref={password} className="loginForm__input-password" type="password" />
                        <MyButton onClick={(e) => validateForm(e)}>Login</MyButton>
                        <h3 onClick={() => setShowRegisterForm(true)} style={{textAlign: 'center'}}>Register</h3>
                    </form>
                </div>
            )
            }
       </>
    );
};


export default LoginForm;

