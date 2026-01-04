import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "../api/api";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  const isPaymentSuccessRoute = location.pathname === "/payment/success";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        //  Allow Stripe success page
        if (isPaymentSuccessRoute) {
          setAllowed(true);
          return;
        }

        if (isAdminRoute) {
          const res = await api.get("/admin/profile", {
            withCredentials: true,
          });
          setAllowed(!!res.data?.admin);
        } else {
          //  Token-based user auth
          const token = localStorage.getItem("token");
          setAllowed(!!token);
        }
      } catch {
        setAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  
  if (loading) return null;

  if (!allowed) {
    return (
      <Navigate
        to={isAdminRoute ? "/admin/login" : "/login"}
        state={{ from: location.pathname }}   
        replace
      />
    );
  }

  return children;
}
