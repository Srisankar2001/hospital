import React, { useEffect, useState } from 'react'
import "./AdminDashboard.css"
import { AdminTitle } from '../Title/AdminTitle'
import home from "../../../Assets/home.png"
import axiosInstance from '../../../Config/axiosConfig'
import { AppointmentBarChart, AppointmentDoughnutChart} from '../../Chart/PatientChart'

export const AdminDashboard = () => {
  const [userCount, setUserCount] = useState({})
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axiosInstance.get("/count/user")
        if (response.data.success) {
          setUserCount(response.data.data)
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert(error.response?.data?.message || "Error Fetching Data")
      }
    }
    fetchUserCount()
  }, [])
  return (
    <div className='admin-dashboard'>
      <AdminTitle title="Quick Statistics" image={home} link=" / Dashboard" />
      <div className='admin-dashboard-container'>
        <section>
          <div>
            <span>Patient : {userCount.patientCount || 0}</span>
          </div>
          <div>
            <span>Doctor : {userCount.doctorCount || 0}</span>
          </div>
          <div>
            <span>Admin : {userCount.adminCount || 0}</span>
          </div>
        </section>
        <div>
          <AppointmentBarChart className='admin-dashboard-bar'/>
          <AppointmentDoughnutChart className='admin-dashboard-doughnut'/>
        </div>
      </div>
    </div>

  )
}
