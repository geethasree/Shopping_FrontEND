import React, { useState, useContext, useEffect } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import toast, { Toaster } from 'react-hot-toast';
import ReactLoading from 'react-loading';
import axios from 'axios'







export default function Login() {

    const [password, setPassword] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [email,setEmail]=useState('')


   
    const navigate = useNavigate()

  


    const signIn = (event) => {
        event?.preventDefault();
        setisLoading(true)
        if (email === '' || password === '') {
            toast.error("Please enter all the credentials")
            setisLoading(false)
            return
        }
        else{
            axios.post('http://localhost:3001/login',{email,password}).then((res)=>{
                console.log(res.data);
                setisLoading(false)
                if(res.data.message==="Login Successful"){
                    localStorage.setItem('email',email)
                    navigate('/home')
                }
                else if(res.data.message==="Email Not Found"){
                    toast.error("Email Not Found")
                }
                else if(res.data.message==="Invalid Password"){
                    toast.error("Invalid Password")
                }
                else{ 
                    toast.error("Error Occured.Please try again")
                }       
            })
            .catch((err)=>{
                setisLoading(false)
                console.log(err);
            })
        }


      


    }

    return (
        <div className='CentralPart1'>
            <div className='LoginSection'>
                <p className='LoginHeading1'>Welcome back User</p>
                <p className='LoginHeading2'>Enter your details to Login </p>
                <div className='LoginPart'>
                    <p className='username1'>Email</p>
                    <div className='InputsWithIcons1'>
                        <MdEmail className='InputIcon' />
                        <input type="text" placeholder="Email" style={{ border: "none", outline: "none" }} className='Inputs1' value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <p className='Password1'>Password</p>
                    <div className='InputsWithIcons1'>
                        <FaLock className='InputIcon' />
                        <input placeholder="Password" type="Password" style={{ border: "none", outline: "none" }} className='Inputs1' value={password} onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    signIn();
                                }
                            }}
                        />
                    </div>

                    <div type='submit' style={{ textDecoration: "none" }} onClick={signIn} className='LoginButton'>
                        {
                            !isLoading ?
                                <span className='login_button_text'>Login</span> :
                                <div style={{ display: "flex", justifyContent: "center" }}><ReactLoading type="spin" color="white" height={30} width={30} /></div>
                        }
                    </div>

                    {/* <p className='forgot_password' onClick={() => navigate('/reset-password')}>Forgot Password?</p> */}
                    <p className='forgot_password' onClick={() => navigate('/signup')}>Don't have an account? <span style={{color:'#ac868a'}}>Signup</span></p>
                </div>

            </div>

            <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    className: '',
                    duration: 5000,
                    style: {
                        background: 'white',
                        color: '#000',
                    },

                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'white',
                        },
                    },
                }}
            />

        </div >
    )
}

