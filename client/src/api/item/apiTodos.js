import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callTodosItemsAPI = {
  ativos: async () => {

    try {
      const call = await api.post(routes.servico.novo, JSON.stringify())
      console.log(call)
      return call.data

    } catch (error) {
      console.log(error)
    }
  }
}