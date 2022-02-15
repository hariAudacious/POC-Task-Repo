import React, { useState, useEffect } from "react";
import _ from "lodash"
import {Navigate, useNavigate} from "react-router-dom"
import Cookies from "js-cookie";

const Trying = () => {
 
 const  objArray = [ { name: "Hariom", email: "h@gmail.com"},
             { name: "Mohit", email: "m@gmail.com"},    
             { name: "Anjli", email: "a@gmail.com"},    
             { name: "Jyoti", email: "j@gmail.com"},    
             { name: "Kalyani", email: "k@gmail.com"},    
             { name: "Dolly", email: "d@gmail.com"} 
             ];
    const allData = _.map(objArray,"email")
	const mailchecker = _.includes(allData,"m@gmail.com")
    // console.log(mailchecker)
return<></>
 
}
export default Trying