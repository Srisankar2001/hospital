import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Config/axiosConfig';
import "./Schedule.css";
import { AdminTitle } from '../Title/AdminTitle';
import doctor from '../../../Assets/doctor.png';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const hours = [...Array(24).keys()].map(i => i.toString().padStart(2, '0'));
const minutes = ['00', '15', '30', '45'];

export const Schedule = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { _id } = location.state;

    if (!_id) {
        navigate("/allDoctors");
    }

    const [schedule, setSchedule] = useState([]);
    const [input, setInput] = useState({
        Monday: {},
        Tuesday: {},
        Wednesday: {},
        Thursday: {},
        Friday: {},
        Saturday: {},
        Sunday: {}
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = { _id: _id };
                const response = await axiosInstance.post("/schedule/get", data);
                if (response.data.success) {
                    const fetchedSchedule = response.data.data;
                    const initialInput = { Monday: {}, Tuesday: {}, Wednesday: {}, Thursday: {}, Friday: {}, Saturday: {}, Sunday: {} };

                    fetchedSchedule.forEach(item => {
                        initialInput[item.day] = {
                            startTime: item.startTime,
                            endTime: item.endTime,
                            timeInterval: item.timeInterval
                        };
                    });

                    setSchedule(fetchedSchedule);
                    setInput(initialInput);
                } else {
                    alert(response.data.message);
                    navigate("/viewDoctor");
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Fetching Data");
                navigate("/viewDoctor");
            }
        };
        fetchData();
    }, [navigate, _id]);

    const handleInputChange = (day, field, value) => {
        setInput(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [field]: value
            }
        }));
    };

    const handleSelectChange = (day, field, hour, minute) => {
        const time = `${hour}:${minute}`;
        handleInputChange(day, field, time);
    };

    const renderTimeSelect = (day, field) => {
        const time = input[day][field] || "00:00";
        const [selectedHour, selectedMinute] = time.split(':');

        return (
            <div className='admin-schedule-input-time'>
                <select value={selectedHour} onChange={(e) => handleSelectChange(day, field, e.target.value, selectedMinute)}>
                    {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
                </select>
                :
                <select value={selectedMinute} onChange={(e) => handleSelectChange(day, field, selectedHour, e.target.value)}>
                    {minutes.map(minute => <option key={minute} value={minute}>{minute}</option>)}
                </select>
            </div>
        );
    };

    const renderScheduleInputs = () => {
        return days.map(day => (
            <div className='admin-schedule-day' key={day}>
                <div className='admin-schedule-day-div'>
                    <h3>{day}</h3>
                    <div className='admin-schedule-input'>
                        <div>
                            <label>Start Time</label>
                            {renderTimeSelect(day, 'startTime')}
                        </div>
                        <div>
                            <label>End Time</label>
                            {renderTimeSelect(day, 'endTime')}
                        </div>
                        <div>
                            <label>Time Interval</label>
                            <input
                                type="number"
                                value={input[day].timeInterval || ""}
                                onChange={(e) => handleInputChange(day, 'timeInterval', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                {errors[day] && <div className="admin-schedule-error">{errors[day]}</div>}
            </div>
        ));
    };

    const validateSchedule = () => {
        let valid = true;
        let newErrors = {};

        days.forEach(day => {
            const { startTime, endTime, timeInterval } = input[day];

            if (startTime && endTime) {
                const start = new Date(`1970-01-01T${startTime}:00`);
                const end = new Date(`1970-01-01T${endTime}:00`);

                if (start >= end) {
                    valid = false;
                    newErrors[day] = 'Start time must be before end time';
                }

                if (timeInterval) {
                    const interval = parseInt(timeInterval, 10);
                    if (isNaN(interval) || interval < 20 || interval > 60) {
                        valid = false;
                        newErrors[day] = 'Time interval must be between 20 minutes and 1 hour';
                    }else{
                        const intervalMillis = interval * 60000;
                        if (start.getTime() + intervalMillis > end.getTime()) {
                            valid = false;
                            newErrors[day] = 'Start time and interval must be before end time';
                        }
                    }
                } else {
                    valid = false;
                    newErrors[day] = 'Enter time interval';
                }
            }

        });

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        if (validateSchedule()) {
            try {
                const data = {
                    _id: _id,
                    scheduleData: days
                        .filter(day => input[day].startTime && input[day].endTime && input[day].timeInterval)
                        .map(day => ({
                            day,
                            ...input[day]
                        }))
                }
                const response = await axiosInstance.post("/schedule/set", data);
                if (response.data.success) {
                    alert("Schedule updated successfully");
                    navigate("/viewDoctor", { state: { _id: _id } })
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Updating Schedule");
            }
        }
    };

    return (
        <div className='admin-schedule'>
            <AdminTitle title="View Doctor" image={doctor} link=" / Doctors / Edit Schedule" />
            <div className='admin-schedule-container'>
                <h1>Edit Schedule</h1>
                <div className='admin-schedule-input-div'>
                    {renderScheduleInputs()}
                    <div className='admin-schedule-btn'>
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={() => navigate("/viewDoctor", { state: { _id: _id } })}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
