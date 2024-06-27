import React, { useContext, useState } from 'react';
import './Navbar.css';
import logo from '../../Assets/logo.jpeg';
import { AppContext } from '../../App';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    const {auth} = useContext(AppContext)
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='navbar'>
            <div className='navbar-header'>
                <img src={logo} alt="Logo" className='navbar-logo' />
                <ul className='navbar-link-full'>
                    <li><Link to='/'>Home<hr/></Link></li>
                    <li><Link to='/about'>About<hr/></Link></li>
                    <li><Link to='/doctors'>Doctors<hr/></Link></li>
                    <li><Link to='/departments'>Departments<hr/></Link></li>
                    <li><Link to='/contact'>Contact<hr/></Link></li>
                    {(auth.isPatient || auth.isDoctor) ?  <li><Link to='/appointment'>Appointments<hr/></Link></li> : <li><Link to='/register'>Register<hr/></Link></li>}
                </ul>
                <div className='navbar-header-right'>
                    {(auth.isPatient || auth.isDoctor) ?  <Link to='/logout' className='navbar-login'>Logout</Link> : <Link to='/login' className='navbar-login'>Login</Link>}
                    <button onClick={toggleNavbar} className='navbar-toggle-button'>
                        ☰
                    </button>
                </div>
            </div>
            <ul className={`navbar-link-half ${isOpen ? 'open':''}`}>
                <li><Link to='/'>Home<hr/></Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/doctors'>Doctors</Link></li>
                <li><Link to='/departments'>Departments</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
                {(auth.isPatient || auth.isDoctor) ?  <li><Link to='/appointment'>Appointments</Link></li> : <li><Link to='/register'>Register</Link></li>}
            </ul>
        </div>
    );
};
