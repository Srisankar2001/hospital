import React, { useEffect, useState } from 'react'
import "./Departments.css"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Config/axiosConfig'

export const Departments = () => {
    const navigate = useNavigate()
    const [department, setDepartment] = useState([])
    useEffect(() => {
        const fetchDepartment = async () => {
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
        fetchDepartment()
    }, [navigate])

    const renderData = () => {
        if (department.length === 0) {
            return <div>No doctor available to display</div>;
        } else {
            return department.map((item, index) => (
                <div key={index}>
                    <img src={`http://localhost:3001/images/${item.image}`} alt="" />
                    <span>{item.name}</span>
                    <span>{item.description}</span>
                </div>
            ));
        }
    };

    return (
        <div className='doctor'>
            <h1>Our Departments</h1>
            {renderData()}
        </div>
    )

}
