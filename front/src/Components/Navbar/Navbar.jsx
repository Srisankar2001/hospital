import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../Assets/logo.jpeg';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='navbar'>
            <div className='navbar-header'>
                <img src={logo} alt="Logo" className='navbar-logo' />
                <ul className='navbar-link-full'>
                    <li>Home<hr/></li>
                    <li>About<hr/></li>
                    <li>Doctors<hr/></li>
                    <li>Departments<hr/></li>
                    <li>Contact<hr/></li>
                    <li><a href='/register'>Register<hr/></a></li>
                </ul>
                <div className='navbar-header-right'>
                    <a href='/login' className='navbar-login'>Login</a>
                    <button onClick={toggleNavbar} className='navbar-toggle-button'>
                        ☰
                    </button>
                </div>
            </div>
            <ul className={`navbar-link-half ${isOpen ? 'open':''}`}>
                <li>Home</li>
                <li>About</li>
                <li>Doctors</li>
                <li>Departments</li>
                <li>Contact</li>
                <li><a href='/register'>Register</a></li>
            </ul>
        </div>
    );
};
