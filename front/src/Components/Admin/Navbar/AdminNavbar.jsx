import React, { useState } from 'react';
import './AdminNavbar.css';

import logo from '../../../Assets/logo-2.png'
import up_icon from '../../../Assets/up-arrow.png';
import down_icon from '../../../Assets/down-arrow.png';
import home from '../../../Assets/home.png';
import department from '../../../Assets/building.png';
import doctor from '../../../Assets/doctor.png';
import patient from '../../../Assets/patient.png';
import appointment from '../../../Assets/report.png';

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
                    <a href='/'>
                        <div>
                            <img src={home} alt="" />
                            <span>Dashboard</span>
                        </div>
                    </a>
                </li>
                <li className='admin-navbar-main-list'>
                    <a href='#'>
                        <div>
                            <img src={appointment} alt="" />
                            <span>Appointments</span>
                        </div>
                    </a>
                </li>
                <li onClick={() => toggleDropdown('departments')} className={activeDropdown === 'departments' ? 'admin-navbar-main-list-active' : 'admin-navbar-main-list'}>
                    <div>
                        <img src={department} alt="" />
                        <span>Departments</span>
                        <img src={activeDropdown === 'departments' ? up_icon : down_icon} alt='' className='admin-navbar-arrow' />
                    </div>
                    {activeDropdown === 'departments' && (
                        <ul className='admin-navbar-sub'>
                            <li className='admin-navbar-sub-list'><a href='/addDepartment'>Add Department</a></li>
                            <li className='admin-navbar-sub-list'><a href='/viewDepartment'>View Departments</a></li>
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
                            <li className='admin-navbar-sub-list'><a href='/addDoctor'>Add Doctor</a></li>
                            <li className='admin-navbar-sub-list'><a href='/viewDoctor'>View Doctors</a></li>
                        </ul>
                    )}
                </li>
                <li className='admin-navbar-main-list'>
                    <a href='/patient'>
                        <div>
                            <img src={patient} alt="" />
                            <span>Patients</span>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
};
