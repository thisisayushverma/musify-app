import {  useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { getUserDetails } from "../features/auth.ts";
import Loading from "./Loading.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogin } from "../reduxSlice/userSlice.ts";

function MainHome() {
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state:any)=>state.user)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUserDetails();
        console.log("response for user details", response);
        
        if (response.status === 201) {
          dispatch(setUserLogin({ user: response.data, isAuthenticated: true }));
        }
        // else{
        //     dispatch(setUserLogin({ user: null, isAuthenticated:false }));
        // }
        console.log("check authenticated or not",isAuthenticated);
        setReady(true);
      } catch (error) {
        console.log(error);
      }                                                                                                                                                                                                                                                                   
    };

    fetchUserDetails();

  }, []);
  return <div className="h-full max-h-screen">{ready ? <Outlet /> : <Loading />}</div>;
}

export default MainHome;
