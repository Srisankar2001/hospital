import React, { useEffect } from 'react'
import axiosInstance from '../../Config/axiosConfig'
import { useNavigate } from 'react-router-dom'

export const Logout = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        const sendData = async () => {
            try {
                const response = await axiosInstance.get("/login")
                if (response.data.success) {
                    alert("Logout Successfully")
                    navigate("/")
                } else {
                    alert("Logout Failed")
                    navigate("/")
                }
            } catch (error) {
                alert("Logout Failed")
                navigate("/")
            }
        }
        sendData()
    },[])
}
