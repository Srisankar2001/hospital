import React, { useEffect, useState } from 'react'
import "./ViewPatient.css"
import { useNavigate } from 'react-router-dom';
import { AdminTitle } from '../Title/AdminTitle'
import patient from '../../../Assets/patient.png'
import axiosInstance from '../../../Config/axiosConfig';

export const ViewPatient = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/Patient/getAll")
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
            return <div>No Patient available to display</div>
        } else {
            data.map((item, index) => {
                const lastAppointment = item.appointments.slice(-1)[0];
                let status;

                if (lastAppointment === 'completed') {
                    status = <td className='admin-viewPatient-status-completed'>Completed</td>;
                } else if (lastAppointment === 'scheduled') {
                    status = <td className='admin-viewPatient-status-scheduled'>Scheduled</td>;
                } else if (lastAppointment === 'cancelled') {
                    status = <td className='admin-viewPatient-status-cancelled'>Cancelled</td>;
                } else {
                    status = <td className='admin-viewPatient-status-notbooked'>Not booked</td>;
                }

                return (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.contactNumber}</td>
                        <td>{item.appointments.length}</td>

                        <td>
                            <button className='admin-viewPatient-edit' onClick={() => { navigate(`/editPatient`, { state: { _id: item._id } }) }}>Edit</button>
                            {item.user.active ?
                                <button className='admin-viewPatient-block' onClick={() => handleBlock(item.user._id)}>Block</button>
                                :
                                <button className='admin-viewPatient-unblock' onClick={() => handleUnblock(item.user._id)}>Unblock</button>
                            }
                        </td>
                    </tr>
                )
            })
        }
    }

    const handleBlock = (_id) => {
        const sendData = async () => {
            try {
                const data = {
                    _id: _id
                }
                const response = await axiosInstance.put("/Patient/block", data)
                if (response.data.success) {
                    alert(response.data.message)
                    window.location.reload()
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Sending To Server")
            }
        }
        sendData()
    }
    const handleUnblock = (_id) => {
        const sendData = async () => {
            try {
                const data = {
                    _id: _id
                }
                const response = await axiosInstance.put("/Patient/unblock", data)
                if (response.data.success) {
                    alert(response.data.message)
                    window.location.reload()
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
            <AdminTitle title="View Patient" image={patient} link=" / Patients / View Patients" />
            <div className='admin-viewPatient-container'>
                <h1>View Patients</h1>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                    {renderData()}
                </table>
            </div>
        </div>
    )
}
