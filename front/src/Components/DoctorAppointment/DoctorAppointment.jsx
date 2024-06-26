import React, { useContext, useEffect, useState } from 'react'
import "./DoctorAppointment.css"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Config/axiosConfig'
import { AppContext } from '../../App'

export const DoctorAppointment = () => {
    const navigate = useNavigate()
    const { user } = useContext(AppContext)
    const [doctorId, setDoctorId] = useState(null)
    const [appointment, setAppointment] = useState([])

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const data = {
                    id: user.id
                }
                const response = await axiosInstance.post("/doctor/getByUserId", data)
                if (response.data.success) {
                    setDoctorId(response.data.data._id)
                    setAppointment(response.data.data.appointments)
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Fetching Data")
            }
        }
        fetchDoctor()
    }, [navigate])

    const renderActivity = () => {
        if (appointment.length === 0) {
            return (<tr><td colSpan="4">No Appointments Available</td></tr>)
        } else {
            return appointment.map((item, index) => {
                let status = item.status;
                return (
                    <tr key={index}>
                        <td>{item.patient.id}</td>
                        <td>{item.patient.name}</td>
                        <td>{item.date.split('T')[0]}</td>
                        <td>{item.time}</td>
                        {/* <td><button className={status === "scheduled" ? "doctorAppointment-status-scheduled" : status === "completed" ? "doctorAppointment-status-completed" : status === "cancelled" ? "doctorAppointment-status-cancelled" : "doctorAppointment-status-not"}>{status}</button></td> */}
                        <td>
                            {status === "completed" ? <span className='doctorAppointment-span-complete'>Completed</span> : status === "cancelled" ? <span className='doctorAppointment-span-cancel'>Cancelled</span> : <div className='doctorAppointment-btn'><button className='doctorAppointment-btn-complete' onClick={() => handleComplete(item._id)}>Complete</button>  <button className='doctorAppointment-btn-cancel' onClick={() => handleCancel(item._id)}>Cancel</button></div>}
                        </td>
                    </tr>
                )
            })
        }
    }
    const handleComplete = (id) => {
        const sendData = async () => {
            try {
                const data = {
                    _id: id
                }
                const response = await axiosInstance.post("/appointment/complete", data)
                if (response.data.success) {
                    alert(response.data.message)
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Sending To Server")
            }
        }
        sendData()
    }

    const handleCancel = (id) => {
        const sendData = async () => {
            try {
                const data = {
                    _id: id
                }
                const response = await axiosInstance.post("/appointment/cancel", data)
                if (response.data.success) {
                    alert(response.data.message)
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Sending To Server")
            }
        }
        sendData()
    }
    return (
        <div className='doctorAppointment'>
            <div className='doctorAppointment-container'>
                <div className='doctorAppointment-activity'>
                    <h1>Doctor Activity</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderActivity()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
