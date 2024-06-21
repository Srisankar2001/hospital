import React, { useContext, useEffect, useState, useMemo } from 'react'
import "./PatientAppiontment.css"
import { AppContext } from '../../App'
import axiosInstance from '../../Config/axiosConfig'
import { useNavigate } from 'react-router-dom'

export const PatientAppiontment = () => {
    const navigate = useNavigate()
    const { user } = useContext(AppContext)
    const [department, setDepartment] = useState([])
    const [doctor, setDoctor] = useState([])
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
                const response = await axiosInstance.get("/doctor/getAllFull")
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
    }, [])

    const renderDepartment = useMemo(() => {
        if (department.length === 0) {
            return <option value="">No department available</option>
        } else {
            return department.map((item, index) => (
                <option key={index} value={item._id}>{item.name}</option>
            ))
        }
    }, [department])

    const renderDoctor = useMemo(() => {
        const filteredDoctors = input.department !== "" 
            ? doctor.filter(item => item.department._id === input.department && item.user.active) 
            : doctor.filter(item => item.user.active)

        if (filteredDoctors.length === 0) {
            return <option value="">No doctor available</option>
        } else {
            return filteredDoctors.map((item, index) => (
                <option key={index} value={item._id}>{item.name}</option>
            ))
        }
    }, [doctor, input.department])

    const dateArray = useMemo(() => {
        const today = new Date();
        const dates = [];

        for (let i = 0; i < 5; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);

            const formattedDate = date.toISOString().split('T')[0];
            dates.push({
                value: formattedDate,
                date: formattedDate === new Date().toISOString().split('T')[0] ? 'Today' : formattedDate
            });
        }

        return dates
    }, [])

    const renderDate = useMemo(() => {
        return dateArray.map((item, index) => (
            <option value={item.value} key={index}>{item.date}</option>
        ))
    }, [dateArray])

    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const dayOfWeek = date.getDay();
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return weekdays[dayOfWeek];
    };

    const renderSchedule = useMemo(() => {
        if (input.doctor !== "" && input.date !== "") {
            const selectedDoctor = doctor.find(item => item._id === input.doctor);
            if (selectedDoctor) {
                const dayOfWeek = getDayOfWeek(input.date);
                const scheduleForDay = selectedDoctor.schedules.find(item => item.day === dayOfWeek);
                if (scheduleForDay) {
                    const appointmentsForDay = selectedDoctor.appointments.filter(item => item.date === input.date);
                    const timeSlots = [];
                    let [startHour, startMinute] = scheduleForDay.startTime.split(':').map(Number);
                    const [endHour, endMinute] = scheduleForDay.endTime.split(':').map(Number);
                    const interval = scheduleForDay.interval;

                    while (startHour < endHour || (startHour === endHour && startMinute <= endMinute)) {
                        const formattedTime = `${startHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
                        const isBooked = appointmentsForDay.some(appointment => appointment.time === formattedTime);

                        timeSlots.push(
                            <div key={formattedTime} className='time-slot'>
                                <button
                                    onClick={() => setInput(prev => ({ ...prev, time: formattedTime }))}
                                    disabled={isBooked}
                                    className={isBooked ? 'booked' : 'available'}
                                >
                                    {formattedTime}
                                </button>
                            </div>
                        );

                        startMinute += interval;
                        if (startMinute >= 60) {
                            startMinute -= 60;
                            startHour += 1;
                        }
                    }

                    return (
                        <div className='schedule'>
                            <h2>Schedule for {selectedDoctor.name} on {input.date}</h2>
                            <div className='time-slots'>
                                {timeSlots.length > 0 ? timeSlots : <span>No available time slots for this day</span>}
                            </div>
                        </div>
                    );
                } else {
                    return <span>No schedule found for this day</span>;
                }
            } else {
                return <span>No doctor found</span>;
            }
        } else {
            return <span>Select a doctor and date</span>;
        }
    }, [doctor, input.date, input.doctor])

    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
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
                            {renderDepartment}
                        </select>
                    </div>
                    <div className='patientAppiontment-input'>
                        <label>Doctor</label>
                        <select name="doctor" value={input.doctor} onChange={handleChange}>
                            <option value="">Select Doctor</option>
                            {renderDoctor}
                        </select>
                    </div>
                    <div className='patientAppiontment-input'>
                        <label>Date</label>
                        <select name="date" value={input.date} onChange={handleChange}>
                            <option value="">Select Date</option>
                            {renderDate}
                        </select>
                    </div>
                    <div className='patientAppiontment-time'>
                        <h3>Available Time</h3>
                        {renderSchedule}
                    </div>
                </div>
            </form>
        </div>
    )
}
