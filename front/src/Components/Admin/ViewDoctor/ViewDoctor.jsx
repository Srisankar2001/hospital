import React, { useEffect, useState } from 'react'
import "./ViewDoctor.css"
import { useNavigate } from 'react-router-dom';
import { AdminTitle } from '../Title/AdminTitle'
import building from '../../../Assets/building.png'
import axiosInstance from '../../../Config/axiosConfig';


export const ViewDoctor = () => {
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
                        <button className='admin-viewDoctor-edit' onClick={() => { navigate(`/editDoctor`, { state: { _id: item._id } }) }}>Edit</button>
                        {item.user.active ?
                            <button className='admin-viewDoctor-block' onClick={()=>handleBlock(item.user._id)}>Block</button>
                            :
                            <button className='admin-viewDoctor-unblock' onClick={()=>handleUnblock(item.user._id)}>Unblock</button>
                        }
                    </td>
                </tr>
            ))
        }
    }

    const handleBlock = (_id)=>{
        const sendData = async() => {
            try{
                const data = {
                    _id:_id
                }
                const response = await axiosInstance.put("/doctor/block",data)
                if (response.data.success) {
                    alert(response.data.message)
                    window.location.reload()
                } else {
                    alert(response.data.message)
                }
            }catch(error){
                alert(error.response?.data?.message || "Error Sending To Server")
            }
        }
        sendData()
    }
    const handleUnblock = (_id)=>{
        const sendData = async() => {
            try{
                const data = {
                    _id:_id
                }
                const response = await axiosInstance.put("/doctor/unblock",data)
                if (response.data.success) {
                    alert(response.data.message)
                    window.location.reload()
                } else {
                    alert(response.data.message)
                }
            }catch(error){
                alert(error.response?.data?.message || "Error Sending To Server")
            }
        }
        sendData()
    }
    return (
        <div className='admin-viewDoctor'>
            <AdminTitle title="View Doctor" image={building} link=" / Doctors / View Doctors" />
            <div className='admin-viewDoctor-container'>
                <h1>View Doctor</h1>
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
