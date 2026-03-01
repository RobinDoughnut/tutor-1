import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const currency = "$"
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [tutors, setTutors] = useState([])
  const [token, settoken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
  const [userData, setUserData] = useState(false)
  
  const getTutorsData = async ()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/tutor/list')
      if(data.success){
        // console.log(data.tutors)
        setTutors(data.tutors)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const loadUserProfileData = async ()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers:{token}})
      if(data.success){
        setUserData(data.userData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  
  useEffect(()=>{
    getTutorsData()
  }, [])

  useEffect(()=>{
    if(token){
      loadUserProfileData()
    }else{
      setUserData(false)
    }
  }, [token])

  const value = {tutors, currency, navigate, token, settoken, backendUrl, loadUserProfileData, userData, setUserData, getTutorsData}  
  
  return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider