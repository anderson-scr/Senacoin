import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callServicoAPI = {
  novo: async (dadosServico) => {

    try {
      const call = await api.post(routes.servico.novo, JSON.stringify(dadosServico))
      console.log(call)
      return call.data

    } catch (error) {
      console.log(error)
    }
  }
}