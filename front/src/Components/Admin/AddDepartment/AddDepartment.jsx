import React, { useRef, useState } from 'react'
import "./AddDepartment.css"
import { AdminTitle } from '../Title/AdminTitle'
import building from '../../../Assets/building.png'
import image from '../../../Assets/image.png'

export const AddDepartment = () => {
  const [input,setInput] = useState({
    name:"",
    description:"",
    image:""
  })
  const [error,setError] = useState({
    name:"enter the name",
    description:"enter description",
    image:"Select an image"
  })
  const imageInputRef = useRef(null)
  const handleImageClick = () => {
    imageInputRef.current.click();
  };
  const handleChange = (e) => {
    setInput(prev=>({
      ...prev,
      image:e.target.files[0]
    }))
  }
  return (
    <div className='admin-addDepartment'>
        <AdminTitle title="Add Department" image={building} link=" / Departments / Add Depatment"/>
        <div className='admin-addDepartment-container'>
          <h1>Add Department</h1>
          <form>
            <div>
              <label>Department Name</label>
              <input type='text' name='name' value={input.name} placeholder='Deparment name'/>
              {error.name && <h6>{error.name}</h6>}
            </div>
            <div>
              <label>Department Description</label>
              <input type='text' name='description' value={input.description} placeholder='Deparment description'/>
              {error.description && <h6>{error.description}</h6>}
            </div>
            <div>
              <label>Department Image</label>
              <img htmlFor='image' src={input.image ? URL.createObjectURL(input.image) : image} alt="" onClick={handleImageClick}/>
              <input type='file' name='image' id='image' hidden ref={imageInputRef} onChange={handleChange}/>
              {error.image && <h6>{error.image}</h6>}
            </div>
            <div className='admin-addDepartment-btn'>
              <button>Submit</button>
              <button>Clear</button>
            </div>
          </form>
        </div>
    </div>
  )
}
