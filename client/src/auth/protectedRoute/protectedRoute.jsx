import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
  const login = useAuth()
  const location = useLocation()

  return (
    login?.user
      ? <Outlet />
      : <Navigate to="/Login" state={{from: location}} replace />
  )
}

export default RequireAuth