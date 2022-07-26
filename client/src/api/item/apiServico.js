import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callServicoAPI = {
  novo: async (dadosServico) => {
    try {
      const apiResponse = await api.post(routes.servico.novo, JSON.stringify(dadosServico))
      return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  }
}