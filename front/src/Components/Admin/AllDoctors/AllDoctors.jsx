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
                        {/* {item.user.active ?
                            <button className='admin-allDoctors-block' onClick={()=>handleBlock(item.user._id)}>Block</button>
                            :
                            <button className='admin-allDoctors-unblock' onClick={()=>handleUnblock(item.user._id)}>Unblock</button>
                        } */}
                    </td>
                </tr>
            ))
        }
    }

    // const handleBlock = (_id)=>{
    //     const sendData = async() => {
    //         try{
    //             const data = {
    //                 _id:_id
    //             }
    //             const response = await axiosInstance.put("/doctor/block",data)
    //             if (response.data.success) {
    //                 alert(response.data.message)
    //                 window.location.reload()
    //             } else {
    //                 alert(response.data.message)
    //             }
    //         }catch(error){
    //             alert(error.response?.data?.message || "Error Sending To Server")
    //         }
    //     }
    //     sendData()
    // }
    // const handleUnblock = (_id)=>{
    //     const sendData = async() => {
    //         try{
    //             const data = {
    //                 _id:_id
    //             }
    //             const response = await axiosInstance.put("/doctor/unblock",data)
    //             if (response.data.success) {
    //                 alert(response.data.message)
    //                 window.location.reload()
    //             } else {
    //                 alert(response.data.message)
    //             }
    //         }catch(error){
    //             alert(error.response?.data?.message || "Error Sending To Server")
    //         }
    //     }
    //     sendData()
    // }
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
