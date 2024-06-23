import React, { useContext, useEffect, useState } from 'react'
import "./PatientAppiontment.css"
import { AppContext } from '../../App'
import axiosInstance from '../../Config/axiosConfig'
import { useNavigate } from 'react-router-dom'
import { dateArray } from '../../Functions/dateArray'
import { getDayOfWeek } from '../../Functions/getDayOfWeek'

export const PatientAppiontment = () => {
    const navigate = useNavigate()
    const { user } = useContext(AppContext)
    const [department, setDepartment] = useState([])
    const [doctor, setDoctor] = useState([])
    const [schedule, setSchedule] = useState({})
    const [appointment, setAppointment] = useState([])
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
        fetchDepartment()
        fetchDoctor()
    }, [navigate])

    const renderDepartment = () => {
        if (!department) {
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
        if (!doctor) {
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

    const handelSearch = () => {
        if (input.doctor !== "" && input.department !== "") {
            const fetchDoctorFull = async () => {
                try {
                    const data = {
                        _id: input.doctor
                    }
                    const response = await axiosInstance.post("/doctor/getFull", data)
                    if (response.data.success) {
                        setSchedule(response.data.data.schedule)
                        setAppointment(response.data.data.appiontments)
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

    const handelClear = () => {
        setInput({
            department: "",
            doctor: "",
            date: "",
            time: ""
        })
        setSchedule(null)
        setAppointment(null)
    }
    const renderSchedule = () => {
        if (input.date && schedule !== null) {
            const weekDay = getDayOfWeek(input.date);
            const daySchedule = schedule[weekDay];

            if (!daySchedule || daySchedule.endTime === "00:00") {
                return <span>No Schedule available this day</span>;
            }

            const startTime = daySchedule.startTime;
            const endTime = daySchedule.endTime;
            const intervalTime = daySchedule.intervalTime;

            const appointments = appointment.filter(item => item.date === input.date).map(item => item.time)

            const timeSlots = [];
            let [startHour, startMinute] = startTime.split(':').map(Number);
            const [endHour, endMinute] = endTime.split(':').map(Number);

            while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
                const formattedTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
                const isBooked = appointments.includes(formattedTime);

                timeSlots.push(
                    <input
                        key={formattedTime}
                        type="button"
                        value={formattedTime}
                        className={isBooked ? 'patientAppointment-btn-booked' : 'patientAppointment-btn-available'}
                        onClick={isBooked ? null : () => setInput(prev => ({ ...prev, time: formattedTime }))}
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

    return (
        <div className='patientAppointment'>
            <h1>Patient Appointment</h1>
            <form>
                <div className='patientAppointment-input-div'>
                    <div className='patientAppiontment-input'>
                        <label>Department</label>
                        <select name="department" value={input.department} onChange={handleChange}>
                            <option value="">Select Department</option>
                            {renderDepartment()}
                        </select>
                    </div>
                    <div className='patientAppiontment-input'>
                        <label>Doctor</label>
                        <select name="doctor" value={input.doctor} onChange={handleChange}>
                            <option value="">Select Doctor</option>
                            {renderDoctor()}
                        </select>
                    </div>
                    <div className='patientAppiontment-input'>
                        <label>Date</label>
                        <select name="date" value={input.date} onChange={handleChange}>
                            <option value="">Select Date</option>
                            {renderDate()}
                        </select>
                    </div>
                    <div className='patientAppiontment-btn'>
                        <input type='button' value="Search" onClick={handelSearch} />
                        <input type='reset' value="Clear" onClick={handelClear} />
                    </div>
                    <div className='patientAppiontment-time'>
                        <h3>Available Time</h3>
                        {renderSchedule()}
                    </div>
                </div>
            </form>
        </div>
    )
}
