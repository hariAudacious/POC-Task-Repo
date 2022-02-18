import React, { useEffect, useState } from 'react'
import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "white"
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },
});
const ViewAllusers = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const { id } = useParams()
  const [userData, setUserData] = useState([])
  useEffect(() => {
    getApi()
  }, [])
  const getApi = async () => {
    const { data } = await axios.get(`http://localhost:3333/users/${id}`)
    setUserData(data)
  }
  const handleClick = () => {
    navigate("/superadmin/users")
  }
  return (
    <>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4"><b>{`${userData.firstName}-${userData.lastName}`}</b></Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>FirstName</TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>LastName</TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>Password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            <TableRow >
              <TableCell align="center"><h5>{id}</h5></TableCell>
              <TableCell align="center"><h5>{userData.firstName}</h5></TableCell>
              <TableCell align="center"><h5>{userData.lastName}</h5></TableCell>
              <TableCell align="center"><h5>{userData.email}</h5></TableCell>
              <TableCell align="center"><h5>{userData.password}</h5></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={handleClick}>Back to Home</Button>
      </Box>
    </>
  )
}
export default ViewAllusers;