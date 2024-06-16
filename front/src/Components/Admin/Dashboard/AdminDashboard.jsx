import React from 'react'
import "./AdminDashboard.css"
import { AdminTitle } from '../Title/AdminTitle'
import home from "../../../Assets/home.png"
export const AdminDashboard = () => {
  return (
    <div className='admin-dashboard'>
      <AdminTitle title="Quick Statistics" image={home} link=" / Dashboard"/>
      
      </div>

  )
}
