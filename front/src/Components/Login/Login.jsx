import React, { useState } from 'react'
import "./Login.css"
import { validate } from '../../Functions/loginValidation'
import axiosInstance from '../../Config/axiosConfig'
export const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }
    const handleReset = () => {
        setInput({
            email: "",
            password: ""
        })
        setError({
            email: "",
            password: ""
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const errors = validate(input)
        setError(errors)
        if(Object.values(errors).every(item => item === "")){
            console.log(input)
        }
    }
    return (
        <div className='login'>
            <div className='login-container'>
                <h1>Login</h1>
                <form onReset={handleReset} onSubmit={handleSubmit}>
                    <div className='login-input-div'>
                        <div className='login-input'>
                            <label>Email</label>
                            <input type='text' name='email' placeholder='Enter your email' onChange={handleChange}/>
                            {error.email && <h6>{error.email}</h6>}
                        </div>
                        <div className='login-input'>
                            <label>Password</label>
                            <input type='password' name='password' placeholder='Enter your password' onChange={handleChange}/>
                            {error.password && <h6>{error.password}</h6>}
                        </div>
                    </div>
                    <div className='login-btn'>
                        <input type='submit' value='Submit'/>
                        <input type='reset' value='Clear'/>
                    </div>
                </form>
            </div>
        </div>
    )
}
