import React, { useEffect, useRef, useState } from 'react'
import "./AddAdmin.css"
import { AdminTitle } from '../Title/AdminTitle'
import admin from '../../../Assets/admin.png'
import image from '../../../Assets/image.png'
import axiosInstance from '../../../Config/axiosConfig'
import { validate } from '../../../Functions/adminValidation'
import { name } from '../../../Functions/name'
import { age } from '../../../Functions/age'

export const AddAdmin = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        name: "",
        dob: "",
        gender: "",
        contactNumber: "",
        address: "",
        image: null
    })
    const [error, setError] = useState({
        email: "",
        password: "",
        name: "",
        dob: "",
        gender: "",
        contactNumber: "",
        address: "",
        image: ""
    })
    const imageInputRef = useRef(null)
    const handleImageClick = () => {
        imageInputRef.current.click();
    };
    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            if (file) {
                if (file.type.startsWith('image/')) {
                    setError(prev => ({
                        ...prev,
                        image: ""
                    }))
                    setInput(prev => ({
                        ...prev,
                        image: file
                    }));
                } else {
                    setError(prev => ({
                        ...prev,
                        image: "Invalid image format"
                    }))
                    e.target.value = null;
                }
            }
        } else {
            setInput(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }))
        }
    }
    const handleClear = (e) => {
        setInput({
            email: "",
            password: "",
            name: "",
            dob: "",
            gender: "",
            contactNumber: "",
            address: "",
            image: null
        })
        setError({
            email: "",
            password: "",
            name: "",
            dob: "",
            gender: "",
            contactNumber: "",
            address: "",
            image: ""
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validate(input)
        setError(errors)
        if (Object.values(errors).every(item => item === "")) {
            const sendData = async () => {
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    const data = {
                        name: name(input.name.trim()),
                        email: input.email.trim(),
                        password: input.password.trim(),
                        age: age(input.dob),
                        dob: input.dob,
                        gender: input.gender,
                        contactNumber: input.contactNumber.trim(),
                        address: input.address.trim(),
                        image: input.image
                    }
                    const response = await axiosInstance.post("/admin/register",data,config)
                    if (response.data.success) {
                        alert(response.data.message)
                        handleClear()
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
        <div className='admin-addAdmin'>
            <AdminTitle title="Add Admin" image={admin} link=" / Admins / Add Admin" />
            <div className='admin-addAdmin-container'>
                <h1>Add Admin</h1>
                <form>
                    <div className='admin-addAdmin-input-div'>
                        <div className='admin-addAdmin-input'>
                            <label>Name</label>
                            <input type='text' name='name' value={input.name} placeholder='Admin name' onChange={handleChange} />
                            {error.name && <h6>{error.name}</h6>}
                        </div>
                        <div className='admin-addAdmin-input'>
                            <label>Date of Birth</label>
                            <input type='date' name='dob' value={input.dob} onChange={handleChange} />
                            {error.dob && <h6>{error.dob}</h6>}
                        </div>
                        <div className='admin-addAdmin-input'>
                            <label>Gender</label>
                            <select name='gender' onChange={handleChange} value={input.gender}>
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {error.gender && <h6>{error.gender}</h6>}
                        </div>
                        <div className='admin-addAdmin-input'>
                            <label>Email</label>
                            <input type='text' name='email' value={input.email} placeholder='Admin email' onChange={handleChange} />
                            {error.email && <h6>{error.email}</h6>}
                        </div>
                        <div className='admin-addAdmin-input'>
                            <label>Password</label>
                            <input type='password' name='password' value={input.password} placeholder='Admin password' onChange={handleChange} />
                            {error.password && <h6>{error.password}</h6>}
                        </div>
                        <div className='admin-addAdmin-input'>
                            <label>Contact Number</label>
                            <input type='text' name='contactNumber' value={input.contactNumber} placeholder='Contact number' onChange={handleChange} />
                            {error.contactNumber && <h6>{error.contactNumber}</h6>}
                        </div>
                        <div className='admin-addAdmin-input'>
                            <label>Address</label>
                            <input type='text' name='address' value={input.address} placeholder='Address' onChange={handleChange} />
                            {error.address && <h6>{error.address}</h6>}
                        </div>
                    </div>
                    <div className='admin-addAdmin-input'>
                        <label>Picture</label>
                        <img htmlFor='image' src={input.image ? URL.createObjectURL(input.image) : image} alt="" onClick={handleImageClick} />
                        <input type='file' name='image' id='image' hidden ref={imageInputRef} onChange={handleChange} />
                        {error.image && <h6>{error.image}</h6>}
                    </div>
                    <div className='admin-addAdmin-btn'>
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
