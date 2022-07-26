import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callSubcategoriaAPI = {
  ativo: async () => {
    try {
      const call = await api.get(routes.subcategoria.ativo)
      return call.data
  
    } catch (error) {
      console.log(error)
    }
  }
}
