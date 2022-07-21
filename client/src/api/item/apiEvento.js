import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callEventoAPI = {
  novo: async (dadosEvento) => {

    try {
      const call = await api.post(routes.evento.novo, JSON.stringify(dadosEvento))
      console.log(call)  
      return call.data

    } catch (error) {
      console.log(error)
    }
  }
}