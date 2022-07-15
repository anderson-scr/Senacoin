import { useContext } from "react";
import { AuthContext } from "contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { userAuth } = useContext(AuthContext)

  return (
    userAuth
      ? <Outlet />
      : <Navigate to="/Login" replace />
  )
}

export default RequireAuth