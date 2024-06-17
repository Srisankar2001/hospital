import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import { AddDepartment } from './Components/Admin/AddDepartment/AddDepartment';
import { AddDoctor } from './Components/Admin/AddDoctor/AddDoctor';
import { AdminDashboard } from './Components/Admin/Dashboard/AdminDashboard';
import { AdminNavbar } from './Components/Admin/Navbar/AdminNavbar';
import { ViewDepartment } from './Components/Admin/ViewDepartment/ViewDepartment';
import { EditDepartment } from './Components/Admin/EditDepartment/EditDepartment';

function App() {
  return (
    <div className='app'>
      <Router>
      <AdminNavbar/>
      <Routes>
        <Route path='/' element={<AdminDashboard/>}/>
        <Route path='/addDepartment' element={<AddDepartment/>}/>
        <Route path='/viewDepartment' element={<ViewDepartment/>}/>
        <Route path='/editDepartment' element={<EditDepartment/>}/>
        <Route path='/addDoctor' element={<AddDoctor/>}/>
        <Route path='/viewDoctor' />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
