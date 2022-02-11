import React from 'react';
import SignUp from '../components/Signup';
import LogIn from '../components/Login';
import BlogDetails from '../components/Dashboard/BlogDetails';
import BlogList from '../components/Dashboard/BlogList';
import {Routes,Route,Navigate} from "react-router-dom"
import { useCookies } from 'react-cookie';

const Main = () => {
  const isLogin = true
return <div>
      <Routes>
        <Route path='/' element={<SignUp/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path="/dashboard/list" element={isLogin ? <BlogList/> : <Navigate to="/" />}/>
        <Route path='/dashboard/details' element={<BlogDetails/>}/>
      </Routes>
  </div>;
};

export default Main;
