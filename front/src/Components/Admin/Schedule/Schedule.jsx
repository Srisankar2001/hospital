import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Config/axiosConfig';
import "./Schedule.css";
import { AdminTitle } from '../Title/AdminTitle';
import doctor from '../../../Assets/doctor.png';
import { validate } from '../../../Functions/scheduleValidation'
const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const mins = ["00", "15", "30", "45"];

export const Schedule = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { _id } = location.state;

    if (!_id) {
        navigate("/allDoctors");
    }

    const [input, setInput] = useState({
        monday: { startTime: "00:00", endTime: "00:00", intervalTime: 0 },
        tuesday: { startTime: "00:00", endTime: "00:00", intervalTime: 0 },
        wednesday: { startTime: "00:00", endTime: "00:00", intervalTime: 0 },
        thursday: { startTime: "00:00", endTime: "00:00", intervalTime: 0 },
        friday: { startTime: "00:00", endTime: "00:00", intervalTime: 0 },
        saturday: { startTime: "00:00", endTime: "00:00", intervalTime: 0 },
        sunday: { startTime: "00:00", endTime: "00:00", intervalTime: 0 }
    });

    const [error, setError] = useState({
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.post("/schedule/get", { _id });
                if (response.data.success) {
                    const fetchedSchedule = response.data.data[0];
                    setInput({
                        monday: fetchedSchedule.monday ? fetchedSchedule.monday : { startTime: "00:00", endTime: "00:00", intervalTime: 0 },
                        tuesday: fetchedSchedule.tuesday ? fetchedSchedule.tuesday : { startTime: "00:00", endTime: "00:00", intervalTime: 0 },
                        wednesday: fetchedSchedule.wednesday ? fetchedSchedule.wednesday : { startTime: "00:00", endTime: "00:00", intervalTime: 0 },
                        thursday: fetchedSchedule.thursday ? fetchedSchedule.thursday : { startTime: "00:00", endTime: "00:00", intervalTime: 0 },
                        friday: fetchedSchedule.friday ? fetchedSchedule.friday : { startTime: "00:00", endTime: "00:00", intervalTime: 0 },
                        saturday: fetchedSchedule.saturday ? fetchedSchedule.saturday : { startTime: "00:00", endTime: "00:00", intervalTime: 0 },
                        sunday: fetchedSchedule.sunday ? fetchedSchedule.sunday : { startTime: "00:00", endTime: "00:00", intervalTime: 0 }
                    });
                } else {
                    alert(response.data.message);
                    navigate("/viewDoctor", { state: { _id: _id } });
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Fetching Data");
                navigate("/viewDoctor", { state: { _id: _id } });
            }
        };
        fetchData();
    }, [_id, navigate]);

    const handleChange = (day, field, value) => {
        setInput(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [field]: value
            }
        }));
    };

    const handleSubmit = async () => {
        const errors = validate(input)
        setError(errors)
        if (Object.values(errors).every(item => item === "")) {
            try {
                const response = await axiosInstance.post("/schedule/set", { _id, ...input });
                if (response.data.success) {
                    alert("Schedule updated successfully");
                    navigate("/viewDoctor", { state: { _id: _id } });
                } else {
                    setError(response.data.errors);
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error updating schedule");
            }
        }
    };

    return (
        <div className='admin-schedule'>
            <AdminTitle title="Edit Schedule" image={doctor} link=" / Doctors / Edit Schedule" />
            <div className='admin-schedule-container'>
                <h1>Edit Schedule</h1>
                <div className='admin-schedule-input-div'>
                    {Object.keys(input).map(day => (
                        <div className='admin-schedule-day' key={day}>
                            <div className='admin-schedule-day-div-total'>
                                <div className='admin-schedule-day-div'>
                                    <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                                    <div className='admin-schedule-input'>
                                        <div>
                                            <label>Start Time</label>
                                            <select value={input[day].startTime} onChange={(e) => handleChange(day, 'startTime', e.target.value)}>
                                                {hours.map(hour => mins.map(min => (
                                                    <option key={`${hour}:${min}`} value={`${hour}:${min}`}>{`${hour}:${min}`}</option>
                                                )))}
                                            </select>
                                        </div>
                                        <div>
                                            <label>End Time</label>
                                            <select value={input[day].endTime} onChange={(e) => handleChange(day, 'endTime', e.target.value)}>
                                                {hours.map(hour => mins.map(min => (
                                                    <option key={`${hour}:${min}`} value={`${hour}:${min}`}>{`${hour}:${min}`}</option>
                                                )))}
                                            </select>
                                        </div>
                                        <div>
                                            <label>Time Interval (minutes)</label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={input[day].intervalTime}
                                                onChange={(e) => handleChange(day, 'intervalTime', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                {error[day] && <div className="admin-schedule-error">{error[day]}</div>}
                            </div>
                        </div>
                    ))}
                    <div className='admin-schedule-btn'>
                        <button onClick={handleSubmit}>Submit</button>
                        <button onClick={() => navigate("/viewDoctor", { state: { _id: _id } })}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
