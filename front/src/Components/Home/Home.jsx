import React, { useContext } from 'react'
import "./Home.css"
import doctor from "../../Assets/home-doc.png"
import { AppContext } from '../../App'
import { Link } from 'react-router-dom'
export const Home = () => {
    const {auth} = useContext(AppContext)
    return (
        <div className='home'>
            <div className='home-container'>
                <h1>Welcome to Our Hospital</h1>
                <div className='home-section'>
                    <div className='home-left'>
                        <p>Experience exceptional care with our top-notch medical team and state-of-the-art facilities. <br/>
                            Book your appointments online for a hassle-free healthcare experience. <br/>
                            Your health, our priority.</p>
                        {auth.isPatient ? <Link to="/appointment"><button>Book an appointment</button></Link> : <Link to="/login"><button>Book an appointment</button></Link>}
                    </div>
                    <div className='home-right'>
                        <img src={doctor} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )

}
