import React from 'react';
import { Routes, Route } from "react-router-dom";
import SignUp from '../components/Signup';
import LogIn from '../components/Login';
import BlogDetails from '../components/Dashboard/BlogDetails';
import BlogList from '../components/Dashboard/BlogList';
import SuperAdmin from '../components/Super-Admin/Users-List';
import ViewAllusers from '../components/Super-Admin/View-User/index.js';
import Update from '../components/Super-Admin/Update-User';
import AdminSignUp from '../components/Super-Admin/Signup';
import AdminLogin from '../components/Super-Admin/Login';
const Main = () => {
  return <>
    <Routes>
      <Route path='/' element={<SignUp />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/dashboard/list' element={<BlogList />} />
      <Route path='/dashboard/details/:id' element={<BlogDetails />} />
      <Route path="/superadmin/" element={<AdminSignUp />} />
      <Route path="/superadmin/login" element={<AdminLogin />} />
      <Route path="/superadmin/users" element={<SuperAdmin />} />
      <Route path="/superadmin/update/:id" element={<Update />} />
      <Route path="/superadmin/view/:id" element={<ViewAllusers />} />
    </Routes>
  </>;
};
export default Main;
