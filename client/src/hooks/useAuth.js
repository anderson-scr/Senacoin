import { useContext  } from "react";
import LoginProvider from "../context/loginContext";

const useAuth = () => {
  return useContext(LoginProvider)
}

export default useAuth