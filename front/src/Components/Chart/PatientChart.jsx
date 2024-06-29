import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js"

import { Bar, Doughnut } from "react-chartjs-2"
import axiosInstance from '../../Config/axiosConfig'

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

const dateArray = () => {
    const today = new Date();
    const dates = [];

    for (let i = 1; i <= 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const formattedDate = date.toISOString().split('T')[0];
        dates.push(formattedDate)
    }

    return dates.reverse()
}

export const AppointmentBarChart = () => {
    const [patientCount, setPatientCount] = useState([])
    useEffect(() => {
        const fetchPatientCount = async () => {
            try {
                const dates = dateArray()
                const data = {
                    dates: dates
                }
                const response = await axiosInstance.post("/count/appointment", data)
                console.log(response.data.data)
                if (response.data.success) {
                    setPatientCount(response.data.data)
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Fetching Data")
            }
        }
        fetchPatientCount()
    }, [])

    if (patientCount.length !== 0) {
        const data = {
            labels: patientCount.map(pc => pc.date),
            datasets: [
                {
                    label: 'Completed',
                    data: patientCount.map(pc => pc.completeCount),
                    backgroundColor: '#ef6e6e',
                },
                {
                    label: 'Cancelled',
                    data: patientCount.map(pc => pc.cancelCount),
                    backgroundColor: '#ffaa2a',
                },
                {
                    label: 'Scheduled',
                    data: patientCount.map(pc => pc.scheduledCount),
                    backgroundColor: '#22c6ab',
                },
            ]
        }
        const options = {
    
        }
        return (
            <div style={{ position: 'relative', height: '500px', width: '700px' }}>
                <Bar
                    data={data}
                    options={options}
                ></Bar>
            </div>
        )
    } else {
        return null
    }

}

export const AppointmentDoughnutChart = () => {
    const [appointmentCount, setAppointmentCount] = useState({})
    useEffect(() => {
        const fetchAppointmentCount = async () => {
            try {
                const response = await axiosInstance.get("/count/appointment")
                if (response.data.success) {
                    setAppointmentCount(response.data.data)
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Fetching Data")
            }
        }
        fetchAppointmentCount()
    }, [])
    const data = {
        labels: ['Completed', 'Cancelled', 'Scheduled'],
        datasets: [{
            label: 'No of appointments',
            data: [appointmentCount.completeCount, appointmentCount.cancelCount, appointmentCount.scheduledCount],
            backgroundColor: ['#ef6e6e', '#22c6ab', '#ffaa2a']
        }]
    }
    const options = {

    }
    return (
        <div style={{ position: 'relative', height: '300px', width: '300px' }}>
            <Doughnut
                data={data}
                options={options}
            />
        </div>
    )

}