import React, { useContext, useEffect, useState } from 'react'
import "./Doctors.css"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Config/axiosConfig'
import { AppContext } from '../../App'

export const Doctors = () => {
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
            return department.map((item, deptIndex) => (
                <div key={deptIndex} className='doctor-department'>
                    <h2>{item.name}</h2>
                    <div className='doctor-doctor'>
                    {item.doctors.map((doctor, docIndex) => (
                        <div key={docIndex}>
                            <img src={`http://localhost:3001/images/${doctor.image}`} alt=""/>
                            <span>{doctor.id}</span>
                            <span>{doctor.name}</span>
                            {auth.isPatient ? <button>Make Appointment</button> : <button>Make Appointment</button>}
                        </div>
                    ))}
                    </div>
                </div>
            ));
        }
    };

    return(
        <div className='doctor'>
            <h1>Our Doctors</h1>
            {renderData()}
        </div>
    )

}
