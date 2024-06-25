import React, { useState } from 'react';
import './AdminNavbar.css';

import logo from '../../../Assets/logo.jpeg'
import up_icon from '../../../Assets/up-arrow.png';
import down_icon from '../../../Assets/down-arrow.png';
import home from '../../../Assets/home.png';
import department from '../../../Assets/building.png';
import doctor from '../../../Assets/doctor.png';
import patient from '../../../Assets/patient.png';
import appointment from '../../../Assets/report.png';
import admin from '../../../Assets/admin.png';
import logout from '../../../Assets/logout.png';
import { Link } from 'react-router-dom';

export const AdminNavbar = () => {
    const [activeDropdown, setActiveDropdown] = useState('');

    const toggleDropdown = (dropdownName) => {
        setActiveDropdown(activeDropdown === dropdownName ? '' : dropdownName);
    };

    return (
        <div className='admin-navbar'>
            <img src={logo} alt='' className='admin-navbar-logo' />
            <ul className='admin-navbar-main'>
                <li className='admin-navbar-main-list'>
                    <Link to='/'>
                        <div>
                            <img src={home} alt="" />
                            <span>Dashboard</span>
                        </div>
                    </Link>
                </li>
                <li className='admin-navbar-main-list'>
                    <Link to='/allAppointments'>
                        <div>
                            <img src={appointment} alt="" />
                            <span>Appointments</span>
                        </div>
                    </Link>
                </li>
                <li onClick={() => toggleDropdown('departments')} className={activeDropdown === 'departments' ? 'admin-navbar-main-list-active' : 'admin-navbar-main-list'}>
                    <div>
                        <img src={department} alt="" />
                        <span>Departments</span>
                        <img src={activeDropdown === 'departments' ? up_icon : down_icon} alt='' className='admin-navbar-arrow' />
                    </div>
                    {activeDropdown === 'departments' && (
                        <ul className='admin-navbar-sub'>
                            <li className='admin-navbar-sub-list'><Link to='/addDepartment'>Add Department</Link></li>
                            <li className='admin-navbar-sub-list'><Link to='/viewDepartment'>View Departments</Link></li>
                        </ul>
                    )}
                </li>
                <li onClick={() => toggleDropdown('admins')} className={activeDropdown === 'admins' ? 'admin-navbar-main-list-active' : 'admin-navbar-main-list'}>
                    <div>
                        <img src={admin} alt="" />
                        <span>Admins</span>
                        <img src={activeDropdown === 'admins' ? up_icon : down_icon} alt='' className='admin-navbar-arrow' />
                    </div>
                    {activeDropdown === 'admins' && (
                        <ul className='admin-navbar-sub'>
                            <li className='admin-navbar-sub-list'><Link to='/addAdmin'>Add Admin</Link></li>
                            <li className='admin-navbar-sub-list'><Link to='/allAdmins'>All Admins</Link></li>
                        </ul>
                    )}
                </li>
                <li onClick={() => toggleDropdown('doctors')} className={activeDropdown === 'doctors' ? 'admin-navbar-main-list-active' : 'admin-navbar-main-list'}>
                    <div>
                        <img src={doctor} alt="" />
                        <span>Doctors</span>
                        <img src={activeDropdown === 'doctors' ? up_icon : down_icon} alt='' className='admin-navbar-arrow' />
                    </div>
                    {activeDropdown === 'doctors' && (
                        <ul className='admin-navbar-sub'>
                            <li className='admin-navbar-sub-list'><Link to='/addDoctor'>Add Doctor</Link></li>
                            <li className='admin-navbar-sub-list'><Link to='/allDoctors'>All Doctors</Link></li>
                        </ul>
                    )}
                </li>
                <li className='admin-navbar-main-list'>
                    <Link to='/allPatients'>
                        <div>
                            <img src={patient} alt="" />
                            <span>Patients</span>
                        </div>
                    </Link>
                </li>
                <li className='admin-navbar-main-list'>
                    <Link to='/logout'>
                        <div>
                            <img src={logout} alt="" />
                            <span>Logout</span>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    );
};
