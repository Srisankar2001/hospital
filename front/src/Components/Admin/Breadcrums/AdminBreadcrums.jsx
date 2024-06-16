import React from 'react'
import "./AdminBreadcrums.css"

export const AdminBreadcrums = (props) => {
  return (
    <div className='admin-breadcrums'>
        <img src={props.image} alt="" />
        <span>{props.link}</span>
    </div>
  )
}
