import React from 'react';
import './Contact.css';

export const Contact = () => {
    return (
        <div className="contact">
            <div className='contact-container'>
                <h1>Contact Us</h1>
                <section className="contact-section">
                    <div className="contact-content">
                        <h2>Get in Touch</h2>
                        <p>If you have any questions, concerns, or feedback, please feel free to reach out to us. We're here to help!</p>
                        <form className="contact-form">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required />

                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />

                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="5" required></textarea>

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                    <div className="contact-info">
                        <h2>Contact Information</h2>
                        <p><strong>Address:</strong> 13, Elite Care Hospital , Colombo</p>
                        <p><strong>Phone:</strong> (021) 375-7890</p>
                        <p><strong>Email:</strong> elitecare@hospital.com</p>
                    </div>
                </section>
            </div>
        </div>
    );
};
