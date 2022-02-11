import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import _ from "lodash"
const Trying = () => {

 
  // var users = [
  //   { 'user': 'barney', 'age': 36, 'active': false },
  //   { 'user': 'fred',   'age': 40, 'active': false }
  // ];
  // _.filter(users,function() {})  
    const [cookies, setCookie, removeCookie] = useCookies(['Poc-User-Data']);
    if (!cookies) {
        console.log("There is no anything in cookies",cookies)
         }else{
           console.log("There is Something in Cookies",cookies)
         }
return<></>
 
}
export default Trying