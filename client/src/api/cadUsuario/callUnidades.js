import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callUnidadeAPI = {
  ativo: async () => {

    try {
      const call = await api.get(routes.unidade.ativo)
        return call.data
  
  
    } catch (error) {
      console.log(error)
    }
  }
}
