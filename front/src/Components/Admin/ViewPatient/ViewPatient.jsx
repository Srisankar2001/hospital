import React, { useEffect, useState } from 'react'
import "./ViewPatient.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { AdminTitle } from '../Title/AdminTitle'
import patient from '../../../Assets/patient.png'
import axiosInstance from '../../../Config/axiosConfig'
import edit from "../../../Assets/edit.png"
import lock from "../../../Assets/lock.png"
import unlock from "../../../Assets/unlock.png"
import scheduleEdit from "../../../Assets/schedule.png"

export const ViewPatient = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { _id } = location.state
    if (!_id) {
        navigate("/allDoctors")
    }
    const [data, setData] = useState({
        id: "",
        name: "",
        dob: "",
        age: "",
        gender: "",
        contactNumber: "",
        address: "",
        department: "",
        image: "",
        active: "",
        user: "",
        schedule: ""
    })
    const [appointment, setAppointment] = useState([])
    useEffect(() => {
        fetchData()
    }, [_id, navigate, data.active])

    const fetchData = async () => {
        try {
            const data = {
                _id: _id
            }
            const response = await axiosInstance.post("/patient/getFull", data)
            if (response.data.success) {
                setData({
                    id: response.data.data.id,
                    name: response.data.data.name,
                    age: response.data.data.age,
                    dob: response.data.data.dob.split('T')[0],
                    gender: response.data.data.gender,
                    contactNumber: response.data.data.contactNumber,
                    address: response.data.data.address,
                    image: response.data.data.image,
                    active: response.data.data.user.active,
                    user: response.data.data.user._id,
                })
                setAppointment(response.data.data.appointments)
            } else {
                alert(response.data.message)
                navigate("/allPatients")
            }
        } catch (error) {
            alert(error.response?.data?.message || "Error Fetching Data")
            navigate("/allPatients")
        }
    }

    const renderActivity = () => {
        if (appointment.length === 0) {
            return (<tr><td colSpan="4">No Activity Available</td></tr>)
        } else {
            return appointment.map((item, index) => {
                let status = item.status;
                return (
                    <tr key={index}>
                        <td>{item.doctor.name}</td>
                        <td>{item.date.split('T')[0]}</td>
                        <td>{item.time}</td>
                        <td><span className={status==="scheduled" ? "admin-viewPatient-status-scheduled":status==="completed" ? "admin-viewPatient-status-completed" :status==="cancelled" ? "admin-viewPatient-status-cancelled" : "admin-viewPatient-status-not"}>{status}</span></td>
                    </tr>
                )
            })
        }
    }
    const handleBlock = (id) => {
        const sendData = async () => {
            try {
                const data = {
                    _id: id
                }
                const response = await axiosInstance.put("/patient/block", data)
                if (response.data.success) {
                    alert(response.data.message)
                    fetchData()
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Sending To Server")
            }
        }
        sendData()
    }
    const handleUnblock = (id) => {
        const sendData = async () => {
            try {
                const data = {
                    _id: id
                }
                const response = await axiosInstance.put("/patient/unblock", data)
                if (response.data.success) {
                    alert(response.data.message)
                    fetchData()
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
        <div className='admin-viewPatient'>
            <AdminTitle title="View Patient" image={patient} link=" / Patients / View Patient" />
            <div className='admin-viewPatient-container'>
                <div className='admin-viewPatient-details'>
                    <h1>Patient Details</h1>
                    <div className='admin-viewPatient-details-div'>
                        <div className='admin-viewPatient-details-profile'>
                            <img src={`http://localhost:3001/images/${data.image}`} alt="" className='admin-viewPatient-image' />
                            <div>
                                <button className='admin-viewPatient-edit' onClick={() => { navigate(`/editPatient`, { state: { _id: _id } }) }}><img src={edit} alt="" className='admin-viewPatient-icon' />Edit Details</button>
                                {data.active ? <button className='admin-viewPatient-block' onClick={() => handleBlock(data.user)}><img src={lock} alt="" className='admin-viewPatient-icon' />Block</button> : <button className='admin-viewPatient-unblock' onClick={() => handleUnblock(data.user)}><img src={unlock} alt="" className='admin-viewPatient-icon' />Unblock</button>}
                            </div>
                        </div>
                        <div className='admin-viewPatient-details-table'>
                            <table>
                                <tr>
                                    <th>ID</th>
                                    <td>{data.id}</td>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Date of Birth</th>
                                    <td>{data.dob}</td>
                                </tr>
                                <tr>
                                    <th>Age</th>
                                    <td>{data.age}</td>
                                </tr>
                                <tr>
                                    <th>Gender</th>
                                    <td>{data.gender}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{data.address}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='admin-viewPatient-activity'>
                    <h1>Patient Activity</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Doctor</th>
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
