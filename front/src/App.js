import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AddDepartment } from './Components/Admin/AddDepartment/AddDepartment';
import { AddDoctor } from './Components/Admin/AddDoctor/AddDoctor';
import { AdminDashboard } from './Components/Admin/Dashboard/AdminDashboard';
import { AdminNavbar } from './Components/Admin/Navbar/AdminNavbar';
import { ViewDepartment } from './Components/Admin/ViewDepartment/ViewDepartment';
import { EditDepartment } from './Components/Admin/EditDepartment/EditDepartment';
import { AllDoctors } from './Components/Admin/AllDoctors/AllDoctors';
import { EditDoctor } from './Components/Admin/EditDoctor/EditDoctor';
import { Navbar } from './Components/Navbar/Navbar';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';
import { createContext, useEffect, useState } from 'react';
import axiosInstance from './Config/axiosConfig';
import { Home } from './Components/Home/Home';
import { Logout } from './Components/Logout/Logout';
import { Doctors } from './Components/Doctors/Doctors';
import { ViewDoctor } from './Components/Admin/ViewDoctor/ViewDoctor';
import { Schedule } from './Components/Admin/Schedule/Schedule';
import { PatientAppointment } from './Components/PatientAppointment/PatientAppointment';

export const AppContext = createContext(null);

function App() {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState({
    isDoctor: false,
    isAdmin: false,
    isPatient: false
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axiosInstance.get("/auth");
        if (response.data.success) {
          const userData = response.data.data;
          setUser(userData);
          const role = userData.role;
          if (role === 'ADMIN') {
            setAuth({ isAdmin: true, isDoctor: false, isPatient: false });
          } else if (role === 'DOCTOR') {
            setAuth({ isAdmin: false, isDoctor: true, isPatient: false });
          } else if (role === 'PATIENT') {
            setAuth({ isAdmin: false, isDoctor: false, isPatient: true });
          } 
        } else {
          setUser(null);
          setAuth({ isAdmin: false, isDoctor: false, isPatient: false });
        }
      } catch (error) {
        setUser(null);
        setAuth({ isAdmin: false, isDoctor: false, isPatient: false });
      }
    };
    fetchdata();
  },[]);
  return (
    <div className={auth.isAdmin ? 'app-admin' : 'app'}>
      <AppContext.Provider value={{ user, auth }}>
        <Router>
          {auth.isAdmin ? <AdminNavbar /> : <Navbar />}
          <Routes>
            {!auth.isAdmin &&
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
                <Route path="/doctors" element={<Doctors />} />

                {auth.isPatient && <Route path="/appointment" element={<PatientAppointment/>}/>}
              </>
            }

            {/* Admin Routes */}
            {auth.isAdmin &&
              <>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/addDepartment" element={<AddDepartment />} />
                <Route path="/viewDepartment" element={<ViewDepartment />} />
                <Route path="/editDepartment" element={<EditDepartment />} />
                <Route path="/addDoctor" element={<AddDoctor />} />
                <Route path="/allDoctors" element={<AllDoctors />} />
                <Route path="/viewDoctor" element={<ViewDoctor />} />
                <Route path="/editDoctor" element={<EditDoctor />} />
                <Route path="/schedule" element={<Schedule />} />
              </>
            }

            {(auth.isAdmin || auth.isDoctor || auth.isPatient) && <Route path="/logout" element={<Logout />} />}
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  );
}

export default App;
