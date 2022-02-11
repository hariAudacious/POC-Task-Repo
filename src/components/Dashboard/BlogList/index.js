import React,{useState,useEffect} from "react";
import styles from "./styles.module.scss"
import { useCookies } from 'react-cookie';
import {Navigate, useNavigate} from "react-router-dom"

const BlogList = () => {
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['Poc-User-Data']);



const handleClick = () =>{
 console.log("handleClicked")
  removeCookie('Poc-User-Data')
}

  return (
    <div className={styles.main}>
      <button className={styles.glow_on_hover} onClick={handleClick} >LogOut</button>
      <div className={styles.movie_card} id={styles["bright"]}>
        <div className={styles.info_section}>
          <div className={styles.movie_header}>
            <img className={styles.locandina} src="https://movieplayer.net-cdn.it/t/images/2017/12/20/bright_jpg_191x283_crop_q85.jpg" />
            <h1>Bright</h1>
            <h4>2017, David Ayer</h4>
            <span className={styles.minutes}>117 min</span>
            <p className={styles.type}>Action, Crime, Fantasy</p>
          </div>
          <div className={styles.movie_desc}>
            <p className={styles.text}>
              Set in a world where fantasy creatures live side by side with humans. A human cop is forced to work with an Orc to find a weapon everyone is prepared to kill for.
            </p>
          </div>
        </div>
        <div className={`${styles.blur_back} ${styles.bright_back}`}></div>
      </div>

      <div className={styles.movie_card} id={styles["tomb"]}>
        <div className={styles.info_section}>
          <div className={styles.movie_header}>
            <img className={styles.locandina} src="https://mr.comingsoon.it/imgdb/locandine/235x336/53750.jpg" />
            <h1>Tomb Raider</h1>
            <h4>2018, Roar Uthaug</h4>
            <span className={styles.minutes}>125 min</span>
            <p className={styles.type}>Action, Fantasy</p>
          </div>
          <div className={styles.movie_desc}>
            <p className={styles.text}>
              Lara Croft, the fiercely independent daughter of a missing adventurer, must push herself beyond her limits when she finds herself on the island where her father disappeared.
            </p>
          </div>
        </div>
        <div className={`${styles.blur_back} ${styles.tomb_back}`} ></div>
      </div>

      <div className={styles.movie_card} id={styles["ave"]}>
        <div className={styles.info_section}>
          <div className={styles.movie_header}>
            <img className={styles.locandina} src="https://mr.comingsoon.it/imgdb/locandine/235x336/53715.jpg" />
            <h1>Black Panther</h1>
            <h4>2018, Ryan Coogler</h4>
            <span className={styles.minutes}>134 min</span>
            <p className={styles.type}>Action, Adventure, Sci-Fi</p>
          </div>
          <div className={styles.movie_desc}>
            <p className={styles.text}>
              T'Challa, the King of Wakanda, rises to the throne in the isolated, technologically advanced African nation, but his claim is challenged by a vengeful outsider who was a childhood victim of T'Challa's father's mistake.
            </p>
          </div>
        </div>
        <div className={`${styles.blur_back} ${styles.ave_back}`}></div>
      </div>

    </div>
  )
}
export default BlogList;