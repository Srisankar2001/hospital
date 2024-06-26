import React, { useContext, useEffect, useState } from 'react'
import "./PatientAppointment.css"
import { AppContext } from '../../App'
import axiosInstance from '../../Config/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { dateArray } from '../../Functions/dateArray'
import { getDayOfWeek } from '../../Functions/getDayOfWeek'

export const PatientAppointment = () => {
    const navigate = useNavigate()
    const { user } = useContext(AppContext)
    const [patientId, setPatientId] = useState(null)
    const [department, setDepartment] = useState([])
    const [doctor, setDoctor] = useState([])
    const [schedule, setSchedule] = useState({})
    const [appointment, setAppointment] = useState([])
    const [patientAppointment,setPatientAppointment] = useState([])
    const [showDateSelect, setShowDateSelect] = useState(false);
    const [input, setInput] = useState({
        department: "",
        doctor: "",
        date: "",
        time: ""
    })

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
        const fetchDoctor = async () => {
            try {
                const response = await axiosInstance.get("/doctor/getAll")
                if (response.data.success) {
                    setDoctor(response.data.data)
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Fetching Data")
            }
        }
        const fetchPatient = async () => {
            try {
                const data = {
                    id: user.id
                }
                const response = await axiosInstance.post("/patient/getByUserId", data)
                if (response.data.success) {
                    setPatientId(response.data.data._id)
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
                 alert(error.response?.data?.message || "Error Fetching Data")
            }
        }
        const fetchPatientFull = async () => {
            try {
                const data = {
                    _id: patientId
                }
                const response = await axiosInstance.post("/patient/getFull", data)
                console.log(response.data)
                if (response.data.success) {
                    setPatientAppointment(response.data.data.appointments)
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                console.log(error)
                 alert(error.response?.data?.message || "Error Fetching Data")
            }
        }
        fetchDepartment()
        fetchDoctor()
        fetchPatient()
        fetchPatientFull()
    }, [])

    const renderDepartment = () => {
        if (!department.length) {
            return <option value="">Loading...</option>;
        }

        if (department.length === 0) {
            return <option value="">No department available</option>
        } else {
            return department.map((item, index) => (
                <option key={index} value={item._id}>{item.name}</option>
            ))
        }
    }

    const renderDoctor = () => {
        if (!doctor.length) {
            return <option value="">Loading...</option>;
        }
        const filterDoctor = input.department !== ""
            ? doctor.filter(item => item.department._id === input.department && item.user.active)
            :
            doctor.filter(item => item.user.active)
        if (filterDoctor.length === 0) {
            return <option value="">No doctor available</option>
        } else {
            return filterDoctor.map((item, index) => (
                <option key={index} value={item._id}>{item.name}</option>
            ))
        }
    }

    const renderDate = () => {
        const dates = dateArray()
        return dates.map((item, index) => (
            <option value={item} key={index}>{item}</option>
        ))
    }

    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handelSearch = (e) => {
        e.preventDefault()
        if (input.doctor !== "") {
            const fetchDoctorFull = async () => {
                try {
                    const data = {
                        _id: input.doctor
                    }
                    const response = await axiosInstance.post("/doctor/getFull", data)
                    if (response.data.success) {
                        setSchedule(response.data.data.schedule)
                        setAppointment(response.data.data.appointments || [])
                        setShowDateSelect(true)
                    } else {
                        alert(response.data.message)
                    }
                } catch (error) {
                    alert(error.response?.data?.message || "Error Fetching Data")
                }
            }
            fetchDoctorFull()
        }
    }

    const handelClear = (e) => {
        e.preventDefault()
        setInput({
            department: "",
            doctor: "",
            date: "",
            time: ""
        })
        setSchedule({})
        setAppointment([])
    }
    const renderSchedule = () => {
        if (input.date && schedule !== null && appointment !== null) {
            const weekDay = getDayOfWeek(input.date);
            const daySchedule = schedule[weekDay];

            if (!daySchedule || daySchedule.endTime === "00:00") {
                return <span>No Schedule available this day</span>;
            }

            const startTime = daySchedule.startTime;
            const endTime = daySchedule.endTime;
            const intervalTime = daySchedule.intervalTime;

            const appointments = appointment.filter(item => item.date.split('T')[0] === input.date).map(item => item.time)

            const timeSlots = [];
            let [startHour, startMinute] = startTime.split(':').map(Number);
            const [endHour, endMinute] = endTime.split(':').map(Number);

            while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
                const formattedTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
                const isBooked = appointments.includes(formattedTime);
                const isSelected = input.time === formattedTime;

                timeSlots.push(
                    <input
                        key={formattedTime}
                        type="button"
                        value={formattedTime}
                        className={isBooked ? 'patientAppointment-btn-booked' : isSelected ? 'patientAppointment-btn-selected' : 'patientAppointment-btn-available'}
                        onClick={isBooked ? null : () => setInput(prev => ({ ...prev, time : isSelected ? "" : formattedTime }))}
                    />
                );

                startMinute += intervalTime;
                if (startMinute >= 60) {
                    startMinute -= 60;
                    startHour += 1;
                }
            }

            return (
                <div className='patientAppointment-time-slots'>
                    {timeSlots.length > 0 ? timeSlots : <span>No available time slots for this day</span>}
                </div>
            );

        } else {
            return null
        }

    }

    const handelSubmit = (e) => {
        e.preventDefault()
        if (patientId !== null && input.doctor !== "" && input.date !== "" && input.time) {
            const sendData = async () => {
                console.log(input)
                try {
                    const data = {
                        patientId: patientId,
                        doctorId: input.doctor,
                        date: input.date,
                        time: input.time
                    }
                    const response = await axiosInstance.post("/appointment/create", data)
                    if (response.data.success) {
                        alert(response.data.message)
                        navigate("/")
                    } else {
                        alert(response.data.message)
                    }
                } catch (error) {
                    alert(error.response?.data?.message || "Error sending Data")
                }
            }
            sendData()
        }
    }

    return (
        <div className='patientAppointment'>
            <div className='patientAppointment-container'>
                <h1>Patient Appointment</h1>
                <form>
                    <div className='patientAppointment-input-div'>
                        <div className='patientAppointment-input'>
                            <label>Department</label>
                            <select name="department" value={input.department} onChange={handleChange}>
                                <option value="">Select Department</option>
                                {renderDepartment()}
                            </select>
                        </div>
                        <div className='patientAppointment-input'>
                            <label>Doctor</label>
                            <select name="doctor" value={input.doctor} onChange={handleChange}>
                                <option value="">Select Doctor</option>
                                {renderDoctor()}
                            </select>
                        </div>
                        <div className='patientAppointment-btn'>
                            <button onClick={handelSearch}>Search</button>
                            <button onClick={handelClear}>Clear</button>
                        </div>
                        {showDateSelect && (<div className='patientAppointment-input'>
                            <label>Date</label>
                            <select name="date" value={input.date} onChange={handleChange}>
                                <option value="">Select Date</option>
                                {renderDate()}
                            </select>
                        </div>)}
                        <div className='patientAppointment-time'>
                            <h3>Available Time</h3>
                            {renderSchedule()}
                        </div>
                        <div className='patientAppointment-btn'>
                            <button onClick={handelSubmit}>Book</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
