import React, { useEffect, useState } from 'react'
import { Typography, Button, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../../firebase"
import { signOut, onAuthStateChanged } from "firebase/auth"
import Cookies from 'js-cookie';
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
})
const SuperAdmin = () => {
  const navigate = useNavigate()
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [usersData, setUsersData] = useState([])
  const cookieChecker = Cookies.get("Poc-SuperAdmin-Data")
  useEffect(() => {
    getApi()
    if (!cookieChecker) {
      navigate("/superadmin")
    }
  }, [])
  const getApi = async () => {
    const { data } = await axios.get(
      `http://localhost:3333/users`
    );
    setUsersData(data)
  }
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3333/users/${id}`)
    const deletedUser = usersData.filter((item) => {
      return item.id !== id;
    }
    )
    setUsersData(deletedUser)
  }
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const handleLogOut = () => {
    signOut(auth);
    navigate("/superadmin/login")
    Cookies.remove('Poc-SuperAdmin-Data')
  }
  return (
    <div>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">All Users of POC
        </Typography>
        <p style={{ color: "white" }}> Admin ID : {user?.email} </p>
        <Button variant="outlined" color='secondary' onClick={handleLogOut} startIcon={<DeleteIcon />}>Logout</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersData.map(({ firstName, email, id }) => {
              return (
                <TableRow key={id}>
                  <TableCell align="center" >{id}.</TableCell>
                  <TableCell align="center" >{firstName}</TableCell>
                  <TableCell align="center">{email}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View">
                      <IconButton><Link to={`/superadmin/view/${id}`}><VisibilityIcon color="primary" /></Link></IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton><Link to={`/superadmin/update/${id}`}><EditIcon /></Link></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(id)}><DeleteIcon color="secondary" /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default SuperAdmin