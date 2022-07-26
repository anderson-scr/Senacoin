import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callQrcodeAPI = {
  novo: async (dadosQrcode) => {
    try {
      const apiResponse = await api.post(routes.qrcode.novo, JSON.stringify(dadosQrcode))
      return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  },

  todos: async () => {
    try {
      const apiResponse = await api.get(routes.qrcode.todos)
      console.log(apiResponse.data)  
      return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  }
}