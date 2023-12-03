import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Home from './component/Home';
import Registartion from './component/Registartion';
import Login from './component/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
     <ToastContainer/>
    <Router>
    <Routes>
   
     <Route path="/" element={<Registartion/>}/>
     <Route path="/login" element={<Login/>}/>
<Route path="/Home" element={<Home/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
