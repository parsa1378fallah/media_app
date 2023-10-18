import { Navigate, Outlet } from "react-router-dom";
import { isUserLogin } from "../store/login/login.js";
import { useSelector } from "react-redux";
const ProtectedAuthRoutes = () => {
  const isUserLoginStore = useSelector(isUserLogin)
  return !isUserLoginStore ? <Outlet/> : <Navigate to="/" />;
};

export default ProtectedAuthRoutes;