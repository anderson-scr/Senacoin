import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callEventoAPI = {
  novo: async (dadosEvento) => {

    try {
      const apiResponse = await api.post(routes.evento.novo, JSON.stringify(dadosEvento))
      return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  }
}