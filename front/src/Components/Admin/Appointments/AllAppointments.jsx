import React, { useEffect, useState } from 'react'
import "./AllAppointments.css"
import { useNavigate } from 'react-router-dom';
import { AdminTitle } from '../Title/AdminTitle'
import appointment from '../../../Assets/report.png'
import axiosInstance from '../../../Config/axiosConfig';


export const AllAppointments = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/appointment/getAll")
                if (response.data.success) {
                    setData(response.data.data)
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Fetching Data")
            }
        }
        fetchData()
    }, [navigate])

    const renderData = () => {
        if (data.length === 0) {
            return <div>No appointment available to display</div>
        } else {
            return data.map((item, index) => {
                return (
                    <tr key={index} >
                        <td>{item.patient.id}</td>
                        <td>{item.patient.name}</td>
                        <td>{item.doctor.id}</td>
                        <td>{item.doctor.name}</td>
                        <td>{item.date.split('T')[0]}</td>
                        <td>{item.time}</td>
                        <td><span className={item.status === "scheduled" ? "admin-allAppointments-status-scheduled" : item.status === "completed" ? "admin-allAppointments-status-completed" : "admin-allAppointments-status-cancelled"}>{item.status}</span></td>
                    </tr >
                )
            })
        }
    }

    return (
        <div className='admin-allAppointments'>
            <AdminTitle title="All Patients" image={appointment} link=" / Patients / All Patients" />
            <div className='admin-allAppointments-container'>
                <h1>All Appointments</h1>
                <table>
                    <tr>
                        <th>Patient ID</th>
                        <th>Patient Name</th>
                        <th>Doctor ID</th>
                        <th>Doctor Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Action</th>
                    </tr>
                    {renderData()}
                </table>
            </div>
        </div>
    )
}
