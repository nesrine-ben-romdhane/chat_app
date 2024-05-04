import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';


export function Register(props) {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const toastOption = {
        position:"bottom-right",
        autoClose:8000 ,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }
    const handleValidation = () => {
        const { 
            username,
            email,
            password,
            confirmPassword,
         } = values;
        console.log("values",values)
        if (password !== confirmPassword) {
          toast.error(
            "Password and confirm password should be same.",
            toastOption
          );
          return false;
        } else if (username.length < 3) {
          toast.error(
            "Username should be greater than 3 characters.",
            toastOption
          );
          return false;
        } else if (password.length < 8) {
          toast.error(
            "Password should be equal or greater than 8 characters.",
            toastOption
          );
          return false;
        } else if (email === "") {
          toast.error("Email is required.", toastOption);
          return false;
        }
    
        return true;
      };
    
    const handelSubmit=async(event)=>{
        event.preventDefault()
        if (handleValidation()) {
            const { email, username, password } = values;
            const { data } = await axios.post(registerRoute, {
              username,
              email,
              password,
            });
      
            if (data.status === false) {
              toast.error(data.msg, toastOption);
            }
              navigate("/login");
       
          }

    }

    const handelChange=(e)=>{
        setValues({ ...values, [e.target.name]: e.target.value });
        
    }
    

    return (
        <>
        <FormContainer>
            <form onSubmit={(event)=>handelSubmit(event)}>
                <div className="brand">
                    <img src={Logo} alt="" />
                    <h1>Snappy</h1>
                </div>
                <input type="text" placeholder='Username' name='username' onChange={(e)=>handelChange(e)} />
                <input type="email" placeholder='email' name='email' onChange={(e)=>handelChange(e)} />
                <input type="password" placeholder='password' name='password' onChange={(e)=>handelChange(e)} />
                <input type="password" placeholder='Confirme password' name='confirmPassword' onChange={(e)=>handelChange(e)} />
                <button type='submit'> Create User </button>
                <span> Already have an account ? <Link to="/login">login</Link></span>

            </form>
        </FormContainer>
        <ToastContainer/>
        </>
    )
}
const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 5rem;
  }
  h1 {
    color: white;
    text-transform: uppercase;
  }
}
form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
}
input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
}
button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }


`

