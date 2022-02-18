import firebase, { initializeApp } from "firebase/app"
import {getAuth} from "firebase/auth"
const firebaseConfig = ({
  apiKey: "AIzaSyAjgcFhf-n70MI7SXX9lzkEZVibZsE4UYI",
  authDomain: "poc-project-aa811.firebaseapp.com",
  databaseURL: "https://poc-project-aa811-default-rtdb.firebaseio.com",
  projectId: "poc-project-aa811",
  storageBucket: "poc-project-aa811.appspot.com",
  messagingSenderId: "1058141744161",
  appId: "1:1058141744161:web:2b2231f757cde3942e0760"
});
const app = initializeApp(firebaseConfig)
export const auth = getAuth()