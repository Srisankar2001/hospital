import React, { useRef, useState } from 'react'
import "./AddDepartment.css"
import { AdminTitle } from '../Title/AdminTitle'
import building from '../../../Assets/building.png'
import image from '../../../Assets/image.png'
import { validate } from '../../../Functions/depatmentValidation'
import axios from 'axios'
export const AddDepartment = () => {
  const [input,setInput] = useState({
    name:"",
    description:"",
    image:null
  })
  const [error,setError] = useState({
    name:"",
    description:"",
    image:""
  })
  const imageInputRef = useRef(null)
  const handleImageClick = () => {
    imageInputRef.current.click();
  };
  const handleChange = (e) => {
    if(e.target.name === 'image'){
      setInput(prev=>({
        ...prev,
        image:e.target.files[0]
      }))
    }else{
      setInput(prev=>({
        ...prev,
        [e.target.name]:e.target.value
      }))
    }
  }
  const handleClear = (e) => {
    setInput({
      name:"",
      description:"",
      image:null
    })
    setError({
      name:"",
      description:"",
      image:""
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validate(input)
    setError(errors)
    if(Object.values(errors).every(item => item === "")){
      const postData = async()=>{
        try{
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          const data = {
            name : input.name.trim().charAt(0).toUpperCase() + input.name.trim().slice(1).toLowerCase(),
            description : input.description.trim(),
            image : input.image
          }
          const response = await axios.post("http://localhost:3001/department/register",data,config)
          if(response.data.success){
            alert(response.data.message)
            handleClear()
          }else{
            alert(response.data.message)
          }
        }catch(error){
          alert("Error")
        }
      }
      postData()
    }
  }
  return (
    <div className='admin-addDepartment'>
        <AdminTitle title="Add Department" image={building} link=" / Departments / Add Depatment"/>
        <div className='admin-addDepartment-container'>
          <h1>Add Department</h1>
          <form>
            <div className='admin-addDepartment-input'>
              <label>Department Name</label>
              <input type='text' name='name' value={input.name} placeholder='Deparment name' onChange={handleChange}/>
              {error.name && <h6>{error.name}</h6>}
            </div>
            <div className='admin-addDepartment-input'>
              <label>Department Description</label>
              <textarea type='text' name='description' value={input.description} placeholder='Deparment description' onChange={handleChange}/>
              {error.description && <h6>{error.description}</h6>}
            </div>
            <div className='admin-addDepartment-input'>
              <label>Department Image</label>
              <img htmlFor='image' src={input.image ? URL.createObjectURL(input.image) : image} alt="" onClick={handleImageClick}/>
              <input type='file' name='image' id='image' hidden ref={imageInputRef} onChange={handleChange}/>
              {error.image && <h6>{error.image}</h6>}
            </div>
            <div className='admin-addDepartment-btn'>
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={handleClear}>Clear</button>
            </div>
          </form>
        </div>
    </div>
  )
}
