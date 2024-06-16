import './App.css';
import { AddDepartment } from './Components/Admin/AddDepartment/AddDepartment';
import { AdminDashboard } from './Components/Admin/Dashboard/AdminDashboard';
import { AdminNavbar } from './Components/Admin/Navbar/AdminNavbar';

function App() {
  return (
    <div className='app'>
      <AdminNavbar/>
      <AddDepartment/>
    </div>
  );
}

export default App;
