import React, { useState, useEffect } from 'react';
import Styles from "./styles.module.scss"
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../../firebase"
import Cookies from 'js-cookie';
const AdminSignUp = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormValues({ ...formValues, [name]: value });
  };
  const { email, password } = formValues
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);
      Cookies.set('Poc-SuperAdmin-Data', JSON.stringify({ formValues }))
      navigate("/superadmin/users")
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues)
    if (Object.keys(errors).length) {
      setFormErrors(errors)
      return
    }
    try {
      register()
    } catch (error) {
      console.log("Something Went Wrong")
    }
  }
  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    }
    else {
      setIcon(eyeOff);
      setType('password');
    }
  }
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be more than 8 characters";
    } else if (values.password.length > 20) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };
  return <div className={Styles.container}>
    <form onSubmit={handleSubmit} >
      <h4 className={Styles.Heading}>Super Admin Signup</h4>
      <div>
        <div className="input-group mb-3">
          <div className={Styles.input_field}>
            <input type="text" value={formValues.email} name='email' onChange={handleChange} placeholder='Email' autoComplete='off' />
          </div>
        </div>
        <p>{formErrors.email}</p>
        <div className="input-group mb-3">
          <div className={Styles.input_field}>
            <input type={type} value={formValues.password} name='password' onChange={handleChange} placeholder='password' autoComplete='off' />
            <span onClick={handleToggle}><Icon icon={icon} size={25} /></span>
          </div>
        </div>
        <p>{formErrors.password}</p>
        <div>
          <button className={Styles.button} >Create Your Account</button>
        </div>
        I Already Have SuperAdmin Account <Link to="/superadmin/login">Login?</Link>
      </div>
    </form>
  </div>
};
export default AdminSignUp;
