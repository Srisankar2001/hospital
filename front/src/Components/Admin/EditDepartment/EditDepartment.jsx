import React, { useEffect, useRef, useState } from 'react'
import "./EditDepartment.css"
import { AdminTitle } from '../Title/AdminTitle'
import building from '../../../Assets/building.png'
import { name } from '../../../Functions/name'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { validate } from '../../../Functions/editDepartmentValidation'
export const EditDepartment = () => {
    axios.defaults.withCredentials = true
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
                const response = await axios.post("http://localhost:3001/department/get", data)
                console.log(response)
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
                alert(error.response?.data?.message || "Error fetching data")
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
            setInput(prev => ({
                ...prev,
                image: e.target.files[0]
            }))
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
                    const url = input.image instanceof File ? "http://localhost:3001/department/updateWithImage" : "http://localhost:3001/department/updateWithoutImage"
                    const response = await axios.put(url, data,config)
                    if (response.data.success) {
                        alert(response.data.message)
                        navigate("/viewDepartment")
                    } else {
                        alert(response.data.message)
                    }
                } catch (error) {
                    alert(error.response.data.message)
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
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={handleClear}>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
