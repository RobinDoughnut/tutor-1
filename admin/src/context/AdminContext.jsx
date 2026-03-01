import axios from "axios";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [tutors, setTutors] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [dashData, setDashData] = useState(false);

  const getAllTutors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-tutors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setTutors(data.tutors);
        // console.log(data.tutors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const changeAvailability = async (tutId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { tutId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllTutors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllSessions = async (req, res) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/sessions", {
        headers: { aToken },
      });

      if (data.success) {
        setSessions(data.sessions);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelSession = async (sessionId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-session",
        { sessionId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllSessions();
        getDashData()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: { aToken },
      });
      if (data.success) {
        setDashData(data.dashData);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const value = {
    backendUrl,
    aToken,
    setAToken,
    tutors,
    getAllTutors,
    changeAvailability,
    sessions,
    setSessions,
    getAllSessions,
    cancelSession,
    dashData,
    getDashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
