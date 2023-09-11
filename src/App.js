import logo from './logo.svg';
import './App.css';
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom';
import AddEmployee from './Component/AddEmployee';
import Employee from './Component/Employee';
import UpdateEmployee from './Component/UpdateEmployee';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Employee/>}></Route>
          
          <Route path='/AddEmployee'element ={<AddEmployee/>}></Route>
          <Route path='/UpdateEmployee/:id'element ={<UpdateEmployee/>}></Route>

        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
