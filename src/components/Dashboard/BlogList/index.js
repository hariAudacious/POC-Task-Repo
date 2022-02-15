import React, { useEffect, useState } from 'react'
import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss"
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const BlogList = () => {
  const navigate = useNavigate()
  const [allBikeData, setAllBikeData] = useState([])
  const cookieChecker = Cookies.get("Poc-User-Data")

  useEffect(() => {
    getData()
    if (!cookieChecker) {
      navigate("/")
    }
  }, [])

  const getData = async () => {
    const { data } = await axios.get(
      `http://localhost:3333/bikes`
    );
    setAllBikeData(data)
  }
  const handleClick = () => {
    Cookies.remove('Poc-User-Data')
    navigate("/")
  }

  return (<>
    <button className={styles.glow_on_hover} onClick={handleClick} >LogOut</button>
    {allBikeData.map(({ bikeName, about, path, id }) => (
      <div className={styles.main} key={bikeName}>
        <img className={styles.image} src={path} />
        <div className={styles.details}>
          <h1 className={styles.bike}>{bikeName} <Link to={`/dashboard/details/${id}`}><BsArrowRightCircle /></Link></h1>
          <p className={styles.about} >{about}</p>
        </div>
      </div>
    ))}
  </>)
}

export default BlogList