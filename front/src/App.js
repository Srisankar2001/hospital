import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { AddDepartment } from './Components/Admin/AddDepartment/AddDepartment';
import { AddDoctor } from './Components/Admin/AddDoctor/AddDoctor';
import { AdminDashboard } from './Components/Admin/Dashboard/AdminDashboard';
import { AdminNavbar } from './Components/Admin/Navbar/AdminNavbar';
import { ViewDepartment } from './Components/Admin/ViewDepartment/ViewDepartment';
import { EditDepartment } from './Components/Admin/EditDepartment/EditDepartment';
import { ViewDoctor } from './Components/Admin/ViewDoctor/ViewDoctor';
import { EditDoctor } from './Components/Admin/EditDoctor/EditDoctor';
import { Navbar } from './Components/Navbar/Navbar';
import { Login } from './Components/Login/Login';
import { Register } from './Components/Register/Register';


function App() {
  return (
    <div className='app'>
      <Navbar/>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
      {/* <Router>
      <AdminNavbar/>
      <Routes>
        <Route path='/' element={<AdminDashboard/>}/>
        <Route path='/addDepartment' element={<AddDepartment/>}/>
        <Route path='/viewDepartment' element={<ViewDepartment/>}/>
        <Route path='/editDepartment' element={<EditDepartment/>}/>
        <Route path='/addDoctor' element={<AddDoctor/>}/>
        <Route path='/viewDoctor' element={<ViewDoctor/>}/>
        <Route path='/editDoctor' element={<EditDoctor/>}/>
      </Routes>
      </Router> */}
    </div>
  );
}

export default App;
