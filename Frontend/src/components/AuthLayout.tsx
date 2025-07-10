import { useEffect, useState, type ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate, useLocation } from "react-router-dom";
import config from "../config/config";

interface AuthLayoutProps {
  authentication: boolean;
  children: ReactNode;
}

function AuthLayout({ children, authentication = true }: AuthLayoutProps) {
  console.count("AuthLayout Render")
  // console.log("middleware called before");
// console.log("time one",Date.now());
const location = useLocation();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  
  // console.log("time two",Date.now());
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // if isAuth is true then i'checking that accessToken getting new accessToken if it is expired1
    // console.log("middleware useEffect");
    
    const checkAuthorization = async () => {
      setIsLoading(true);
      if (isAuthenticated) {
        try {
          const response = await fetch(
            config.backendUrl + "/auth/check-access-token-present",
            {
              credentials: "include",
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(user),
            }
          );
          // console.log("response when user auth check from backend",response);
          if (response.ok === false) {
            if (response.status === 403) {
              // call api to generate new access and refresh token
              const responseOfRegeneration = await fetch(
                config.backendUrl + "/auth/refresh-access-token",
                {
                  credentials: "include",
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(user),
                }
              );

              // console.log(responseOfRegeneration);
            } else {
              // server error show
              console.log("something went wrong");
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      setIsLoading(prev =>!prev);
    };

    checkAuthorization();
    // console.log("time three",Date.now());
    // console.log("middleware called after");
    
  }, [location.pathname]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // console.log("time four",Date.now());
  if (authentication && !isAuthenticated) {
    // console.log("time five",Date.now());
    return <Navigate to="/login" replace />;
  } else if (!authentication && isAuthenticated) {
    // console.log("time six",Date.now());
    return <Navigate to="/" replace />;
  }
  // console.log("time seven",Date.now());

  return <>{isLoading?<>Loading...</>:children}</>;
}

export default AuthLayout;
