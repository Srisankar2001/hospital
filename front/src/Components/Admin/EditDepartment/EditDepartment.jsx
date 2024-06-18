import React, { useEffect, useRef, useState } from 'react'
import "./EditDepartment.css"
import { AdminTitle } from '../Title/AdminTitle'
import building from '../../../Assets/building.png'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../Config/axiosConfig'
import { validate } from '../../../Functions/editDepartmentValidation'
export const EditDepartment = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { _id } = location.state
    if (!_id) {
        navigate("/viewDepartment")
    }
    const [input, setInput] = useState({
        name: "",
        description: "",
        image: null
    })
    const [error, setError] = useState({
        name: "",
        description: "",
        image: ""
    })
    const imageInputRef = useRef(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = {
                    _id: _id
                }
                const response = await axiosInstance.post("/department/get", data)
                if (response.data.success) {
                    setInput({
                        name: response.data.data.name,
                        description: response.data.data.description,
                        image: response.data.data.image
                    })
                } else {
                    alert(response.data.message)
                    navigate("/viewDepartment")
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Fetching Data")
                navigate("/viewDepartment")
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
                        name: input.name.trim().charAt(0).toUpperCase() + input.name.trim().slice(1).toLowerCase(),
                        description: input.description.trim(),
                        image: input.image
                    }
                    const response = input.image instanceof File ? await axiosInstance.put("/department/updateWithImage", data, config) : await axiosInstance.put("/department/updateWithoutImage", data)
                    if (response.data.success) {
                        alert(response.data.message)
                        navigate("/viewDepartment")
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
        <div className='admin-editDepartment'>
            <AdminTitle title="Edit Department" image={building} link=" / Departments / Edit Depatment" />
            <div className='admin-editDepartment-container'>
                <h1>Edit Department</h1>
                <form>
                    <div className='admin-editDepartment-input'>
                        <label>Department Name</label>
                        <input type='text' name='name' value={input.name} placeholder='Deparment name' onChange={handleChange} />
                        {error.name && <h6>{error.name}</h6>}
                    </div>
                    <div className='admin-editDepartment-input'>
                        <label>Department Description</label>
                        <textarea type='text' name='description' value={input.description} placeholder='Deparment description' onChange={handleChange} />
                        {error.description && <h6>{error.description}</h6>}
                    </div>
                    <div className='admin-editDepartment-input'>
                        <label>Department Image</label>
                        <img htmlFor='image' src={input.image instanceof File ? URL.createObjectURL(input.image) : `http://localhost:3001/images/${input.image}`} alt="" onClick={handleImageClick} />
                        <input type='file' name='image' id='image' hidden ref={imageInputRef} onChange={handleChange} />
                        {error.image && <h6>{error.image}</h6>}
                    </div>
                    <div className='admin-editDepartment-btn'>
                        <button onClick={handleSubmit}>Update</button>
                        <button onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
