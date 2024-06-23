import React, { useEffect, useState } from 'react'
import "./ViewDoctor.css"
import { useLocation, useNavigate } from 'react-router-dom'
import { AdminTitle } from '../Title/AdminTitle'
import doctor from '../../../Assets/doctor.png'
import axiosInstance from '../../../Config/axiosConfig'
import edit from "../../../Assets/edit.png"
import lock from "../../../Assets/lock.png"
import unlock from "../../../Assets/unlock.png"
import scheduleEdit from "../../../Assets/schedule.png"

export const ViewDoctor = () => {
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
    }, [_id,navigate,data.active])

    const fetchData = async () => {
        try {
            const data = {
                _id: _id
            }
            const response = await axiosInstance.post("/doctor/getFull", data)
            if (response.data.success) {
                setData({
                    id: response.data.data.id,
                    name: response.data.data.name,
                    age: response.data.data.age,
                    dob: response.data.data.dob.split('T')[0],
                    gender: response.data.data.gender,
                    contactNumber: response.data.data.contactNumber,
                    address: response.data.data.address,
                    department: response.data.data.department.name,
                    image: response.data.data.image,
                    active: response.data.data.user.active,
                    user: response.data.data.user._id,
                    schedule : response.data.data.schedule
                })
                setAppointment(response.data.data.appointments)
            } else {
                alert(response.data.message)
                navigate("/allDoctors")
            }
        } catch (error) {
            alert(error.response?.data?.message || "Error Fetching Data")
            navigate("/allDoctors")
        }
    }
    
    const renderSchedule = () => {
        const findSchedule = Object.keys(data.schedule).filter(key => ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"].includes(key)).map(key => ({day:key, ...data.schedule[key]}))
        const availableSchedule = findSchedule.filter(item => item.endTime !== "00:00")
        if (availableSchedule.length === 0) {
            return (<tr><td colSpan="4">No Schedule Available</td></tr>)
        } else {
            return availableSchedule.map((item, index) => (
                <tr key={index}>
                    <td>{item.day}</td>
                    <td>{item.startTime}</td>
                    <td>{item.endTime}</td>
                    <td>{item.intervalTime}</td>
                </tr>
            ))
        }
    }
    const renderActivity = () => {
        if (appointment.length === 0) {
            return (<tr><td colSpan="4">No Activity Available</td></tr>)
        } else {
            return appointment.map((item, index) => {
                <tr key={index}>
                    <td>{item.patient.name}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.status}</td>
                </tr>
            })
        }
    }
    const handleBlock = (id)=>{
        const sendData = async() => {
            try{
                const data = {
                    _id:id
                }
                const response = await axiosInstance.put("/doctor/block",data)
                if (response.data.success) {
                    alert(response.data.message)
                    fetchData()
                } else {
                    alert(response.data.message)
                }
            }catch(error){
                alert(error.response?.data?.message || "Error Sending To Server")
            }
        }
        sendData()
    }
    const handleUnblock = (id)=>{
        const sendData = async() => {
            try{
                const data = {
                    _id:id
                }
                const response = await axiosInstance.put("/doctor/unblock",data)
                if (response.data.success) {
                    alert(response.data.message)
                    fetchData()
                } else {
                    alert(response.data.message)
                }
            }catch(error){
                alert(error.response?.data?.message || "Error Sending To Server")
            }
        }
        sendData()
    }
    return (
        <div className='admin-viewDoctor'>
            <AdminTitle title="View Doctor" image={doctor} link=" / Doctors / View Doctor" />
            <div className='admin-viewDoctor-container'>
                <div className='admin-viewDoctor-details'>
                    <h1>Doctor Details</h1>
                    <div className='admin-viewDoctor-details-div'>
                        <div className='admin-viewDoctor-details-profile'>
                            <img src={`http://localhost:3001/images/${data.image}`} alt="" className='admin-viewDoctor-image' />
                            <div>
                                <button className='admin-viewDoctor-edit' onClick={() => { navigate(`/editDoctor`, { state: { _id: _id } }) }}><img src={edit} alt="" className='admin-viewDoctor-icon'/>Edit Details</button>
                                {data.active ? <button className='admin-viewDoctor-block' onClick={()=>handleBlock(data.user)}><img src={lock} alt="" className='admin-viewDoctor-icon' />Block</button> : <button className='admin-viewDoctor-unblock' onClick={()=>handleUnblock(data.user)}><img src={unlock} alt="" className='admin-viewDoctor-icon' />Unblock</button>}
                                <button className='admin-viewDoctor-scheduleEdit' onClick={() => { navigate(`/schedule`, { state: { _id: _id } }) }}><img src={scheduleEdit} alt="" className='admin-viewDoctor-icon' />Edit Schedule</button>
                            </div>
                        </div>
                        <div className='admin-viewDoctor-details-table'>
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
                                    <th>Department</th>
                                    <td>{data.department}</td>
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
                <div className='admin-viewDoctor-schedule'>
                    <h1>Doctor Schedule</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Interval</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderSchedule()}
                        </tbody>
                    </table>
                </div>
                <div className='admin-viewDoctor-activity'>
                    <h1>Doctor Activity</h1>
                    <table>
                        <thead>
                            <tr>
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
