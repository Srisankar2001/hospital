import React, { useRef, useState } from 'react'
import "./Register.css"
import { validate } from '../../Functions/registerValidation'
import image from "../../Assets/image.png"
export const Register = () => {
  const [input, setInput] = useState({
    name: "",
    dob: "",
    gender: "",
    contactNumber: "",
    address: "",
    email: "",
    password: "",
    cpassword:"",
    image: null
  })
  const [error, setError] = useState({
    name: "",
    dob: "",
    gender: "",
    contactNumber: "",
    address: "",
    email: "",
    password: "",
    cpassword:"",
    image: ""
  })
  const imageInputRef = useRef(null)
  const handleImageClick = () => {
    imageInputRef.current.click();
  };
  const handleChange = (e) => {
    if (e.target.name === 'image') {
      const file = e.target.files[0];
      if (file) {
        if (file.type.startsWith('image/')) {
          setError(prev => ({
            ...prev,
            image: ""
          }))
          setInput(prev => ({
            ...prev,
            image: file
          }));
        } else {
          setError(prev => ({
            ...prev,
            image: "Invalid image format"
          }))
          e.target.value = null;
        }
      }
    } else {
      setInput(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }))
    }
  }
  const handleReset = () => {
    setInput({
      name: "",
      dob: "",
      gender: "",
      contactNumber: "",
      address: "",
      email: "",
      password: "",
      cpassword:"",
      image: null
    })
    setError({
      name: "",
      dob: "",
      gender: "",
      contactNumber: "",
      address: "",
      email: "",
      password: "",
      cpassword:"",
      image: ""
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validate(input)
    setError(errors)
    if (Object.values(errors).every(item => item === "")) {
      console.log(input)
    }
  }
  return (
    <div className='register'>
      <div className='register-container'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className='register-input-div'>
            <div className='register-input'>
              <label>Name</label>
              <input type='text' name='name' value={input.name} placeholder='Enter your name' onChange={handleChange} />
              {error.name && <h6>{error.name}</h6>}
            </div>
            <div className='register-input'>
              <label>Date of Birth</label>
              <input type='date' name='dob' value={input.dob} onChange={handleChange} />
              {error.dob && <h6>{error.dob}</h6>}
            </div>
            <div className='register-input'>
              <label>Email</label>
              <input type='text' name='email' value={input.email} placeholder='Enter your email' onChange={handleChange} />
              {error.email && <h6>{error.email}</h6>}
            </div>
            <div className='register-input'>
              <label>Gender</label>
              <select name='gender' onChange={handleChange}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {error.gender && <h6>{error.gender}</h6>}
            </div>
            <div className='register-input'>
              <label>Contact Number</label>
              <input type='text' name='contactNumber' value={input.contactNumber} placeholder='Contact number' onChange={handleChange} />
              {error.contactNumber && <h6>{error.contactNumber}</h6>}
            </div>
            <div className='register-input'>
              <label>Address</label>
              <input type='text' name='address' value={input.address} placeholder='Address' onChange={handleChange} />
              {error.address && <h6>{error.address}</h6>}
            </div>
            <div className='register-input'>
              <label>Password</label>
              <input type='password' name='password' value={input.password} placeholder='Enter your password' onChange={handleChange} />
              {error.password && <h6>{error.password}</h6>}
            </div>
            <div className='register-input'>
              <label>Confirm Password</label>
              <input type='password' name='cpassword' value={input.cpassword} placeholder='Re-Enter your password' onChange={handleChange} />
              {error.cpassword && <h6>{error.cpassword}</h6>}
            </div>
          </div>
          <div className='register-image'>
            <label>Picture</label>
            <img htmlFor='image' src={input.image ? URL.createObjectURL(input.image) : image} alt="" onClick={handleImageClick} />
            <input type='file' name='image' id='image' hidden ref={imageInputRef} onChange={handleChange} />
            {error.image && <h6>{error.image}</h6>}
          </div>
          <div className='register-btn'>
            <input type='submit' value="Submit" />
            <input type='reset' value="Clear" />
          </div>
        </form>
      </div>
    </div>
  )
}
