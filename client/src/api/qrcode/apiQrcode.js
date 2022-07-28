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
  todos: async (offset) => {
    try {
      const apiResponse = await api.get(routes.qrcode.todos + offset)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  }
}