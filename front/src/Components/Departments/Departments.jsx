import React, { useContext, useEffect, useState } from 'react'
import "./Departments.css"
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import axiosInstance from '../../Config/axiosConfig'

export const Departments = () => {
    const {auth} = useContext(AppContext)
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
                <div key={index} className='department-div'>
                    <img src={`http://localhost:3001/images/${item.image}`} alt="" />
                    <div>
                        <h3>{item.name}</h3>
                        <span>{item.description}</span>
                        {auth.isPatient ? <Link to="/appointment"><button>Make appointment</button></Link> : <Link to="/login"><button>Make appointment</button></Link>}
                    </div>
                </div>
            ));
        }
    };

    return (
        <div className='department'>
            <div className='department-container'>
                <h1>Our Departments</h1>
                <div className='department-total-div'>
                    {renderData()}
                </div>
            </div>
        </div>
    )

}
