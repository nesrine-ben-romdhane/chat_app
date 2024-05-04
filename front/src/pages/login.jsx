import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import Logo from "../assets/logo.svg"
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';


export function Login(props) {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: "",
        password: ""
    });
    const toastOption = {
        position:"bottom-right",
        autoClose:8000 ,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }

    useEffect(()=>{
        if(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))
        navigate("/")

    },[])



    const handleValidation = () => {
        const { 
            username,
            password,
         } = values;
        if (username==="") {
          toast.error(
            "Username and password is required",
            toastOption
          );
          return false;
        } else if (password==="") {
          toast.error(
            "Password required",
            toastOption
          );
          return false;
        }
        else if (password.length < 8 ) {
            toast.error(
              "Password should be equal or greater than 8 characters.",
              toastOption
            );
            return false;
          }
    
        return true;
      };
    
    const handelSubmit=async(event)=>{
        event.preventDefault()
        if (handleValidation()) {
            const { username, password } = values;
            const { data } = await axios.post(loginRoute, {
              username,
              password,
            });
            console.log("data",data)
      
            if (data.status === false) {
              toast.error(data.msg, toastOption);
            }
            if (data.status === true) {
              localStorage.setItem(
                process.env.REACT_APP_LOCALHOST_KEY,
                JSON.stringify(data.user)
              );
              navigate("/");
            }

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
                <input type="password" placeholder='password' name='password' onChange={(e)=>handelChange(e)} />
                <button type='submit'> Login </button>
                <span> Don' t have an account ? <Link to="/register">register</Link></span>

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

