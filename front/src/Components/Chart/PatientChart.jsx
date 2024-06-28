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
            labels: [patientCount[0].date, patientCount[1].date, patientCount[2].date, patientCount[3].date, patientCount[4].date],
            datasets: [
                {
                    label: `Appointments on ${patientCount[0].date}`,
                    data: [patientCount[0].completeCount, patientCount[0].cancelCount, patientCount[0].scheduledCount],
                    backgroundColor: ['#ef6e6e', '#22c6ab', '#ffaa2a'],
                },
                {
                    label: `Appointments on ${patientCount[1].date}`,
                    data: [patientCount[1].completeCount, patientCount[1].cancelCount, patientCount[1].scheduledCount],
                    backgroundColor: ['#ef6e6e', '#22c6ab', '#ffaa2a'],
                },
                {
                    label: `Appointments on ${patientCount[2].date}`,
                    data: [patientCount[2].completeCount, patientCount[2].cancelCount, patientCount[2].scheduledCount],
                    backgroundColor: ['#ef6e6e', '#22c6ab', '#ffaa2a'],
                },
                {
                    label: `Appointments on ${patientCount[3].date}`,
                    data: [patientCount[3].completeCount, patientCount[3].cancelCount, patientCount[3].scheduledCount],
                    backgroundColor: ['#ef6e6e', '#22c6ab', '#ffaa2a'],
                },
                {
                    label: `Appointments on ${patientCount[4].date}`,
                    data: [patientCount[4].completeCount, patientCount[4].cancelCount, patientCount[4].scheduledCount],
                    backgroundColor: ['#ef6e6e', '#22c6ab', '#ffaa2a'],
                },
            ]
        }
        const options = {
            
        }
        return (
            <div>
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
        <div>
            <Doughnut
                data={data}
                options={options}
            />
        </div>
    )

}