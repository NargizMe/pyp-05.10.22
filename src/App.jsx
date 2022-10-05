import { useState } from 'react';
import {Routes, Route} from "react-router";
import './App.css';
import User from './user';
import AddUser from './user/addUser.jsx';
import Home from './home/index.jsx';
import About from './about/index.jsx';
import {Link} from "react-router-dom";

function App() {

  return (
    <div className="App">
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/user'>User</Link>
            <Link to='/about'>About</Link>
        </nav>

        <Routes>
            <Route path = '/user' element={<User/>}/>
            <Route path = '/' element={<Home/>}/>
            <Route path = '/about' element={<About/>}/>
            <Route path = '/user/add' element={<AddUser/>}/>
        </Routes>
    </div>
  )
}

export default App
