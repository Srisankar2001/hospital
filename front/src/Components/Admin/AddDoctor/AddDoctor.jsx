import React, { useEffect, useRef, useState } from 'react'
import "./AddDoctor.css"
import { AdminTitle } from '../Title/AdminTitle'
import doctor from '../../../Assets/doctor.png'
import image from '../../../Assets/image.png'
import axiosInstance from '../../../Config/axiosConfig'
import { validate } from '../../../Functions/docterValidation'
import { name } from '../../../Functions/name'
import { age } from '../../../Functions/age'
export const AddDoctor = () => {
    const [department, setDepartment] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/department/getAll")
                if (response.data.success) {
                    setDepartment(response.data.data)
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Fetching Data")
            }
        }
        fetchData()
    }, [])
    const [input, setInput] = useState({
        email: "",
        password: "",
        name: "",
        dob: "",
        gender: "",
        contactNumber: "",
        address: "",
        department: "",
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
        department: "",
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
            department: "",
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
            department: "",
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
                        department: input.department,
                        image: input.image
                    }
                    const response = await axiosInstance.post("/doctor/register",data,config)
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
    const renderDepartment = () => {
        if (department.length === 0) {
            return <option value="">No department available</option>;
        } else {
            return department.map((item, index) => (
                <option key={index} value={item._id}>{item.name}</option>
            ))
        }
    }
    return (
        <div className='admin-addDoctor'>
            <AdminTitle title="Add Doctor" image={doctor} link=" / Doctors / Add Doctor" />
            <div className='admin-addDoctor-container'>
                <h1>Add Doctor</h1>
                <form>
                    <div className='admin-addDoctor-input-div'>
                        <div className='admin-addDoctor-input'>
                            <label>Name</label>
                            <input type='text' name='name' value={input.name} placeholder='Doctor name' onChange={handleChange} />
                            {error.name && <h6>{error.name}</h6>}
                        </div>
                        <div className='admin-addDoctor-input'>
                            <label>Date of Birth</label>
                            <input type='date' name='dob' value={input.dob} onChange={handleChange} />
                            {error.dob && <h6>{error.dob}</h6>}
                        </div>
                        <div className='admin-addDoctor-input'>
                            <label>Gender</label>
                            <select name='gender' onChange={handleChange} value={input.gender}>
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {error.gender && <h6>{error.gender}</h6>}
                        </div>
                        <div className='admin-addDoctor-input'>
                            <label>Department</label>
                            <select name='department' onChange={handleChange} value={input.department}>
                                <option value="">Select department</option>
                                {renderDepartment()}
                            </select>
                            {error.department && <h6>{error.department}</h6>}
                        </div>
                        <div className='admin-addDoctor-input'>
                            <label>Email</label>
                            <input type='text' name='email' value={input.email} placeholder='Doctor email' onChange={handleChange} />
                            {error.email && <h6>{error.email}</h6>}
                        </div>
                        <div className='admin-addDoctor-input'>
                            <label>Password</label>
                            <input type='password' name='password' value={input.password} placeholder='Doctor password' onChange={handleChange} />
                            {error.password && <h6>{error.password}</h6>}
                        </div>
                        <div className='admin-addDoctor-input'>
                            <label>Contact Number</label>
                            <input type='text' name='contactNumber' value={input.contactNumber} placeholder='Contact number' onChange={handleChange} />
                            {error.contactNumber && <h6>{error.contactNumber}</h6>}
                        </div>
                        <div className='admin-addDoctor-input'>
                            <label>Address</label>
                            <input type='text' name='address' value={input.address} placeholder='Address' onChange={handleChange} />
                            {error.address && <h6>{error.address}</h6>}
                        </div>
                    </div>
                    <div className='admin-addDoctor-input'>
                        <label>Picture</label>
                        <img htmlFor='image' src={input.image ? URL.createObjectURL(input.image) : image} alt="" onClick={handleImageClick} />
                        <input type='file' name='image' id='image' hidden ref={imageInputRef} onChange={handleChange} />
                        {error.image && <h6>{error.image}</h6>}
                    </div>
                    <div className='admin-addDoctor-btn'>
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
