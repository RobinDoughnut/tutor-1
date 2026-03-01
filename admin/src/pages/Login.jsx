import React, { useContext, useState } from "react";
import loginImg from "../assets/login.png";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { TutorContext } from "../context/TutorContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currState, setCurrState] = useState("Admin");
  const {setAToken, backendUrl} = useContext(AdminContext)
  const {setTToken} = useContext(TutorContext)

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      if(currState === "Admin"){
        const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
        if(data.success){
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
        } else {
          toast.error(data.message)
        }
        
      } else {
        const {data} = await axios.post(backendUrl + '/api/tutor/login', {email, password})
        
        if(data.success){
          localStorage.setItem('tToken', data.token)
          setTToken(data.token)
          // console.log(data.token)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full z-50 bg-white">
      {/* container */}
      <div className="flex h-full w-full">
        {/* IMAGE SIDE */}
        <div className="w-1/2 hidden sm:block">
          <img src={loginImg} alt="" className="object-cover h-full w-full" />
        </div>
        {/* FORM SIDE */}
        <div className="flexCenter w-full sm:w-1/2">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800"
          >
            <div className="w-full mb-4">
              <h3 className="bold-32"><span className="text-secondary border-b-4 border-secondary">{currState}</span> Login</h3>
            </div>
            <div className="w-full">
              <label htmlFor="Email" className="medium-15">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="medium-15">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="w-full px-3 py-1 ring-1 ring-slate-900/10 rounded bg-primary mt-1"
              />
            </div>
            <button
              type="submit"
              className="btn-dark w-full mt-5 !py-[7px] !rounded"
            >
              Login
            </button>
            {currState === "Admin" ? (
              <p onClick={()=>setCurrState("Tutor")} className="underline cursor-pointer text-secondary">
                Tutor Login?
              </p>
            ) : (
              <p onClick={()=>setCurrState("Admin")} className="underline cursor-pointer text-secondary">
                Admin Login?
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
