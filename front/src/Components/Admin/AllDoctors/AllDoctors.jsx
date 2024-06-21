import React, { useEffect, useState } from 'react'
import "./AllDoctors.css"
import { useNavigate } from 'react-router-dom';
import { AdminTitle } from '../Title/AdminTitle'
import doctor from '../../../Assets/doctor.png'
import axiosInstance from '../../../Config/axiosConfig';


export const AllDoctors = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/doctor/getAll")
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
                    <td>{item.contactNumber}</td>
                    <td>{item.department.name}</td>
                    <td>
                        <button className='admin-allDoctors-edit' onClick={() => { navigate(`/viewDoctor`, { state: { _id: item._id } }) }}>View</button>
                    </td>
                </tr>
            ))
        }
    }

    return (
        <div className='admin-allDoctors'>
            <AdminTitle title="All Doctors" image={doctor} link=" / Doctors / All Doctors" />
            <div className='admin-allDoctors-container'>
                <h1>All Doctors</h1>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Contact Number</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                    {renderData()}
                </table>
            </div>
        </div>
    )
}
