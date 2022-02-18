import React from 'react'
import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
import { deepPurple, green } from '@material-ui/core/colors';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white"
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white"
  },
});
const Update = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams()
  const [apiUser, setApiUser] = useState({})
  const handleBackHome = () => {
    navigate("/superadmin")
  }
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
    const { data } = await axios.get(`http://localhost:3333/users/${id}`)
    setApiUser(data)
  }
  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setApiUser({ ...apiUser, [name]: value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    try {
      axios.put(`http://localhost:3333/users/${id}`, apiUser)
      navigate("/superadmin/users")
    } catch (error) {
      console.log("Somthing went wrong");
    }
  }
  return (
    <>
      <Box textAlign="center" p={2} className={classes.headingColor} mb={2}>
        <Typography variant="h2">Update POC User</Typography>
      </Box>
      <Grid container justify="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h4">Edit User</Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="id" name="id" onChange={handleChange} value={id} variant="outlined" required fullWidth id="id" label="ID" autoFocus disabled />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="password" onChange={handleChange} name="password" value={apiUser.password} variant="outlined" required fullWidth id='password' label="password" disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="email" onChange={handleChange} name="email" variant="outlined" value={apiUser.email} required fullWidth id="email" label="Email Address" disabled />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="firstName" onChange={handleChange} name="firstName" value={apiUser.firstName} variant="outlined" required fullWidth id="firstName" label="firstName" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="lastName" onChange={handleChange} name="lastName" value={apiUser.lastName} variant="outlined" required fullWidth id='lastName' label="lastName" />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button type="submit" variant="contained" color="primary" fullWidth > Update </Button>
            </Box>
          </form>
          <Box m={3} textAlign="center">
            <Button variant="contained" color="primary" onClick={handleBackHome}>Back to Home</Button>
          </Box>
        </Grid>
      </Grid >
    </>
  )
}
export default Update