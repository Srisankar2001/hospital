import React, { useEffect, useState } from 'react'
import "./AllAdmins.css"
import { useNavigate } from 'react-router-dom';
import { AdminTitle } from '../Title/AdminTitle'
import admin from '../../../Assets/admin.png'
import axiosInstance from '../../../Config/axiosConfig';

export const AllAdmins = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/admin/getAll")
                if (response.data.success) {
                    setData(response.data.data)
                } else {
                    alert(response.data.message)
                }
            } catch (error) {
                alert(error.response?.data?.message || "Error Fetching Data")
            }
        }
        fetchData()
    }, [navigate])

    const renderData = () => {
        if (data.length === 0) {
            return <div>No doctor available to display</div>
        } else {
            return data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.contactNumber}</td>
                    {/* <td>
                        <button className='admin-allAdmins-edit' onClick={() => { navigate(`/viewDoctor`, { state: { _id: item._id } }) }}>View</button>
                    </td> */}
                </tr>
            ))
        }
    }

    return (
        <div className='admin-allAdmins'>
            <AdminTitle title="All Doctors" image={admin} link=" / Admins / All Admins" />
            <div className='admin-allAdmins-container'>
                <h1>All Admins</h1>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Contact Number</th>
                        {/* <th>Action</th> */}
                    </tr>
                    {renderData()}
                </table>
            </div>
        </div>
    )
}
