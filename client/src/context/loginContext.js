import { createContext, useState } from "react";

const LoginContext = createContext()


const LoginProvider = ({children}) => {
  const [login, setLogin] = useState(false)

  const setLoggedInOut = () => {
    setLogin(!login)
  }

  return (
    <LoginContext.Provider value={{login, setLoggedInOut}} >
      {children}
    </LoginContext.Provider>
  )
}

export default LoginProvider