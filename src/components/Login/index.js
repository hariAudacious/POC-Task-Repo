import React, { useEffect, useState } from 'react';
import Styles from "./styles.module.scss"
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const LogIn = () => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [apiData, setApiData] = useState();
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [cookies, setCookie, removeCookie] = useCookies(['Poc-User-Data']);

  // useEffect(() => {
  //   removeCookie('Poc-User-Data' )
  // },[])

  const getData = async () => {
    try {
      const data = await axios.get("http://localhost:3333/users/")
      setApiData(data)
    } catch (error) {
      console.log("Something Went Wrong")
    }
  }
  

  useEffect(() => {
    if (!apiData) {
      getData()
    } else {
      const allApiEmails = apiData.data.map(({ email }) => { return (email) })
      const allApiPasswords = apiData.data.map(({ password }) => { return (password) })
      const EmailChecker = allApiEmails.includes(formValues.email)
      const PasswordChecker = allApiPasswords.includes(formValues.password)
      if (EmailChecker == true, PasswordChecker == true) {
        navigate("/dashboard/list")
      }
    }
  }, [formErrors])

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues))
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email !";
    }
    if (!values.password) {
      errors.password = "Password is required";
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
      <h4 className={Styles.Heading}>LogIn Here</h4>

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
          <button className={Styles.button} >Login</button>
        </div>
        <>I have not account. <Link to="/">SignUp!!!</Link></>
      </div>
    </form>
  </div>
};

export default LogIn;
