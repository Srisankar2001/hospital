import React, { useEffect, useState } from 'react'
import "./AllPatients.css"
import { useNavigate } from 'react-router-dom';
import { AdminTitle } from '../Title/AdminTitle'
import patient from '../../../Assets/patient.png'
import axiosInstance from '../../../Config/axiosConfig';


export const AllPatients = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/patient/getAll")
                console.log(response.data)
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
            return <div>No patient available to display</div>
        } else {
            return data.map((item, index) => {
                let hasAppointments = item.appointments.length > 0;
                let date = hasAppointments ? item.appointments[item.appointments.length - 1].date.split('T')[0] : "No appointments";
                let status = hasAppointments ? item.appointments[item.appointments.length - 1].status : "not booked";
                return (
                    <tr key={index} >
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.contactNumber}</td>
                        <td>{date}</td>
                        <td><span className={status==="scheduled" ? "admin-allPatients-status-scheduled":status==="completed" ? "admin-allPatients-status-completed" :status==="cancelled" ? "admin-allPatients-status-cancelled" : "admin-allPatients-status-not"}>{status}</span></td>
                        <td>
                            <button className='admin-allPatients-edit' onClick={() => { navigate(`/viewPatient`, { state: { _id: item._id } }) }}>View</button>
                        </td>
                    </tr >
                )
            })
        }
    }

    return (
        <div className='admin-allPatients'>
            <AdminTitle title="All Patients" image={patient} link=" / Patients / All Patients" />
            <div className='admin-allPatients-container'>
                <h1>All Patients</h1>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Contact Number</th>
                        <th>Last Visit</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    {renderData()}
                </table>
            </div>
        </div>
    )
}
