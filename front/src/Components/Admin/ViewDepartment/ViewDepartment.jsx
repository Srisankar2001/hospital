import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ViewDepartment.css'
import { AdminTitle } from '../Title/AdminTitle'
import building from '../../../Assets/building.png'
import axiosInstance from '../../../Config/axiosConfig';
export const ViewDepartment = () => {
    const navigate = useNavigate()
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/department/getAll")
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
            return <div>No deparment available to display</div>
        } else {
            return data.map((item, index) => (
                <tr key={index}>
                    <td><img src={`http://localhost:3001/images/${item.image}`} alt={item.name} /></td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td><button onClick={() => {navigate(`/editDepartment`,{ state: { _id: item._id } })}}>Edit</button></td>
                </tr>
            ))
        }
    }
    return (
        <div className='admin-viewDepartment'>
            <AdminTitle title="View Department" image={building} link=" / Departments / View Depatment" />
            <div className='admin-viewDepartment-container'>
                <h1>View Department</h1>
                <table>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    {renderData()}
                </table>
            </div>
        </div>
    )
}
