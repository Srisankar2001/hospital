import React, { useEffect, useRef, useState } from 'react'
import "./EditDoctor.css"
import { AdminTitle } from '../Title/AdminTitle'
import doctor from '../../../Assets/doctor.png'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../Config/axiosConfig'
import { name } from '../../../Functions/name'
import { validate } from '../../../Functions/editDoctorValidation'
import { age } from '../../../Functions/age'
export const EditDoctor = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { _id } = location.state
    if (!_id) {
        navigate("/viewDoctor")
    }
    const [input, setInput] = useState({
        name: "",
        dob: "",
        gender: "",
        contactNumber: "",
        address: "",
        department: "",
        image: null
    })
    const [error, setError] = useState({
        name: "",
        dob: "",
        gender: "",
        contactNumber: "",
        address: "",
        department: "",
        image: ""
    })
    const imageInputRef = useRef(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = {
                    _id: _id
                }
                const response = await axiosInstance.post("/doctor/get", data)
                if (response.data.success) {
                    setInput({
                        name: response.data.data.name,
                        dob: response.data.data.dob.split('T')[0],
                        gender: response.data.data.gender,
                        contactNumber: response.data.data.contactNumber,
                        address: response.data.data.address,
                        department:response.data.data.department.name,
                        image: response.data.data.image
                    })
                } else {
                    alert(response.data.message)
                    navigate("/viewDoctor")
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Fetching Data")
                navigate("/viewDoctor")
            }
        }
        fetchData()
    }, [navigate])
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
    const handleClear = () => {
        window.location.reload()
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validate(input)
        setError(errors)
        if (Object.values(errors).every(item => item === "")) {
            const postData = async () => {
                try {
                    const config = {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                    const data = {
                        _id: _id,
                        name : name(input.name.trim()),
                        age : age(input.dob),
                        dob: input.dob,
                        gender: input.gender,
                        contactNumber: input.contactNumber.trim(),
                        address: input.address.trim(),
                        image: input.image
                    }
                    const response = input.image instanceof File ? await axiosInstance.put("/doctort/updateWithImage", data, config) : await axiosInstance.put("/doctor/updateWithoutImage", data)
                    if (response.data.success) {
                        alert(response.data.message)
                        navigate("/viewDoctor")
                    } else {
                        alert(response.data.message)
                    }
                } catch (error) {
                    alert(error.response?.data?.message || "Error Sending To Server")
                }
            }
            postData()
        }
    }
    return (
        <div className='admin-editDoctor'>
            <AdminTitle title="Edit Doctor" image={doctor} link=" / Doctors / Edit Doctor" />
            <div className='admin-editDoctor-container'>
                <h1>Edit Doctor</h1>
                <form>
                    <div className='admin-editDoctor-input-div'>
                        <div className='admin-editDoctor-input'>
                            <label>Name</label>
                            <input type='text' name='name' value={input.name} placeholder='Doctor name' onChange={handleChange} />
                            {error.name && <h6>{error.name}</h6>}
                        </div>
                        <div className='admin-editDoctor-input'>
                            <label>Date of Birth</label>
                            <input type='date' name='dob' value={input.dob} onChange={handleChange} />
                            {error.dob && <h6>{error.dob}</h6>}
                        </div>
                        <div className='admin-editDoctor-input'>
                            <label>Gender</label>
                            <select name='gender' onChange={handleChange} value={input.gender}>
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className='admin-editDoctor-input'>
                            <label>Department</label>
                            <input type='text' name='department' value={input.department} readOnly/>
                            {/* <select name='department' onChange={handleChange}>
                                <option value="">Select department</option>
                                {renderDepartment()}
                            </select> */}
                        </div>
                        <div className='admin-editDoctor-input'>
                            <label>Contact Number</label>
                            <input type='text' name='contactNumber' value={input.contactNumber} placeholder='Contact number' onChange={handleChange} />
                            {error.contactNumber && <h6>{error.contactNumber}</h6>}
                        </div>
                        <div className='admin-editDoctor-input'>
                            <label>Address</label>
                            <input type='text' name='address' value={input.address} placeholder='Address' onChange={handleChange} />
                            {error.address && <h6>{error.address}</h6>}
                        </div>
                    </div>
                    <div className='admin-editDoctor-input'>
                        <label>Picture</label>
                        <img htmlFor='image' src={input.image instanceof File ? URL.createObjectURL(input.image) : `http://localhost:3001/images/${input.image}`} alt="" onClick={handleImageClick} />
                        <input type='file' name='image' id='image' hidden ref={imageInputRef} onChange={handleChange} />
                        {error.image && <h6>{error.image}</h6>}
                    </div>
                    <div className='admin-editDoctor-btn'>
                        <button onClick={handleSubmit}>Update</button>
                        <button onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
