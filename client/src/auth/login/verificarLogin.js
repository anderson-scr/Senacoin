import { callLoginAPI } from "api/userLogin"

export const verificaLogin = {
  authLogin: async (emailEntrada, senhaEntrada) => {
    const call = await callLoginAPI(emailEntrada, senhaEntrada)

      .then(data => {
        if(data.status === 200) {
          localStorage.setItem("accessToken", JSON.stringify(data.data.token))
          localStorage.setItem("x-user-email", emailEntrada)
          
          return data.data
        } else return false
      })
    return call
  }
}