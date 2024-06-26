import React, { useContext, useEffect, useState } from 'react'
import "./Doctors.css"
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../Config/axiosConfig'
import { AppContext } from '../../App'

export const Doctors = () => {
    const { auth } = useContext(AppContext)
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
            return department.map((item, deptIndex) => (
                <div key={deptIndex} className='doctor-department'>
                    <h2>{item.name}</h2>
                    <div className='doctor-doctor-div'>
                        {item.doctors.map((doctor, docIndex) => (
                            <div key={docIndex} className='doctor-doctor'>
                                <img src={`http://localhost:3001/images/${doctor.image}`} alt="" />
                                <span>{doctor.name}</span>
                                {auth.isPatient ? <Link to="/appointment"><button className='doctor-btn'>Make Appointment</button></Link> : auth.isDoctor? null : <Link to="/login"><button className='doctor-btn'>Make Appointment</button></Link>}
                            </div>
                        ))}
                    </div>
                </div>
            ));
        }
    };

    return (
        <div className='doctor'>
            <div className='doctor-container'>
                <h1>Our Doctors</h1>
                <div className='doctor-department-div'>
                    {renderData()}
                </div>
            </div>
        </div>
    )

}
