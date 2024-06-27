import React from 'react';
import './About.css';
import hospitalImage from '../../Assets/hospital.jpg';
import doctorImage from '../../Assets/about-doc.png';

export const About = () => {
    return (
        <div className="about">
            <div className='about-container'>
            <h1>About Us</h1>
            <section className="about-section">
                <div className="about-content">
                    <img src={hospitalImage} alt="Hospital" />
                    <h2>Our Hospital</h2>
                    <p>Our hospital has been providing exceptional healthcare services for over 50 years. We are committed to delivering the highest quality care to our patients through our state-of-the-art facilities and experienced medical team.</p>
                    <p>We believe in a patient-centric approach and strive to create a comfortable and healing environment for all those who walk through our doors.</p>
                </div>
            </section>
            <section className="mission-section">
                <div className="mission-content">
                    <h2>Our Mission</h2>
                    <p>Our mission is to provide compassionate and comprehensive healthcare services to our community. We are dedicated to continuous improvement and innovation in healthcare delivery, ensuring the best outcomes for our patients.</p>
                </div>
            </section>
            <section className="team-section">
                <div className="team-content">
                    <h2>Our Team</h2>
                    <div className="team-member">
                        <img src={doctorImage} alt="Doctor" />
                        <div>
                            <h3>Dr. John Doe</h3>
                            <p>Chief Medical Officer</p>
                        </div>
                    </div>
                    <div className="team-member">
                        <img src={doctorImage} alt="Doctor" />
                        <div>
                            <h3>Dr. Jane Smith</h3>
                            <p>Head of Surgery</p>
                        </div>
                    </div>
                    {/* Add more team members as needed */}
                </div>
            </section>
            </div>
        </div>
    );
};
