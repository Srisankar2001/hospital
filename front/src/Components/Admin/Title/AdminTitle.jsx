import React from 'react'
import "./AdminTitle.css"
import { AdminBreadcrums } from '../Breadcrums/AdminBreadcrums'

export const AdminTitle = (props) => {
  return (
    <div className='admin-title'>
      <span className='admin-title-name'>{props.title}</span>
      <AdminBreadcrums link={props.link} image={props.image}/>
      </div>
  )
}
