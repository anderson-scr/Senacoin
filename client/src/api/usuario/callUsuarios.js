import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callUsuarioAPI = {
  novo: async (userInfo) => {

    try {
      const call = await api.post(routes.colaborador.novo, JSON.stringify(userInfo))
        return call.data

    } catch (error) {
      console.log(error)
    }
  }
}