import React, { useState } from 'react'
import "./Login.css"
import { validate } from '../../Functions/loginValidation'
import axiosInstance from '../../Config/axiosConfig'
import { useNavigate } from 'react-router-dom'
export const Login = () => {
    const navigate = useNavigate()
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        const errors = validate(input)
        setError(errors)
        if (Object.values(errors).every(item => item === "")) {
            const sendData = async () => {
                try {
                    const data = {
                        email: input.email.trim(),
                        password: input.password.trim()
                    }
                    const response = await axiosInstance.post("/login", data)
                    if (response.data.success) {
                        alert(response.data.message)
                        navigate("/")
                    } else {
                        alert(response.data.message)
                    }
                } catch (error) {
                    alert(error.response?.data?.message || "Error Sending To Server")
                }
            }
            sendData()
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
                            <input type='text' name='email' placeholder='Enter your email' onChange={handleChange} />
                            {error.email && <h6>{error.email}</h6>}
                        </div>
                        <div className='login-input'>
                            <label>Password</label>
                            <input type='password' name='password' placeholder='Enter your password' onChange={handleChange} />
                            {error.password && <h6>{error.password}</h6>}
                        </div>
                    </div>
                    <div className='login-btn'>
                        <input type='submit' value='Submit' />
                        <input type='reset' value='Clear' />
                    </div>
                </form>
            </div>
        </div>
    )
}
