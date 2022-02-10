import React from 'react';
import SignUp from '../components/Signup';
import LogIn from '../components/Login';
import BlogDetails from '../components/Dashboard/BlogDetails';
import BlogList from '../components/Dashboard/BlogList';
import {Routes,Route} from "react-router-dom"
const Main = () => {
  return <div>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/dashboard/details' element={<BlogDetails/>}/>
        <Route path='/dashboard/list' element={<BlogList/>}/>
      </Routes>
  </div>;
};

export default Main;
