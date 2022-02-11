import React, { useState, useEffect} from 'react';
import Styles from "./styles.module.scss"
import axios from 'axios';
import cookie from "react-cookie";
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';

const SignUp = () => {
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
  const [cookies, setCookie] = useCookies(['user']);

  const { firstName, lastName, email, password } = formValues

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formValues);
    const errors = validate(formValues)
    if (Object.keys(errors).length ) {
      setFormErrors(errors)
      return
    }
    try {
      await axios.post(`http://localhost:3333/users/`, formValues)
      setCookie('Poc-User-Data', JSON.stringify({formValues}),{path:'/'})  
      navigate("/dashboard/list") 
    } catch (error) {
      console.log("Something Went Wrong")
    }
  };

  // console.log(formValues); 
  const validate = (values) => {
    //  console.log(values.firstName);
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    }
    if (!values.lastName) {
      errors.lastName = "last Name is required!";
    }

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


  return <div className={Styles.container}>

    <form onSubmit={handleSubmit} >
      <h4 className={Styles.Heading}>SignUp Here</h4>

      <div>
        <div className="input-group mb-3">
          <div className={Styles.input_field}>
            <input type="text" value={formValues.firstName} name='firstName' onChange={handleChange} placeholder='First Name' autoComplete='off' />
          </div>
        </div>
        <p>{formErrors.firstName}</p>
        <div className="input-group mb-3">
          <div className={Styles.input_field}>
            <input type="text" value={formValues.lastName} name='lastName' onChange={handleChange} placeholder='Last Name' autoComplete='off' />
          </div>
        </div>
        <p>{formErrors.lastName}</p>

        <div className="input-group mb-3">
          <div className={Styles.input_field}>
            <input type="text" value={formValues.email} name='email' onChange={handleChange} placeholder='Email' autoComplete='off' />
          </div>
        </div>
        <p>{formErrors.email}</p>

        <div className="input-group mb-3">
          <div className={Styles.input_field}>
            <input type={type} value={formValues.password}  name='password' onChange={handleChange} placeholder='password' autoComplete='off' />
            <span onClick={handleToggle}><Icon icon={icon} size={25} /></span>
          </div>
        </div>
        <p>{formErrors.password}</p>

        <div>
          <button className={Styles.button} >Create Your Account</button>
        </div>
        I have Already Account <Link to="/login">Login?</Link>
      </div>
    </form>
  </div>
};

export default SignUp;
