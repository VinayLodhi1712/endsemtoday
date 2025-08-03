import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "./spinner";
import { getApiUrl, API_ENDPOINTS } from "../../config/api";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const AuthCheck = async () => {
      try {
        const res = await fetch(
          getApiUrl(API_ENDPOINTS.AUTH.USER_AUTH),
          {
            headers: {
              Authorization: auth?.token,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          if (data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setOk(false);
      }
    };
    if (auth?.token) AuthCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
