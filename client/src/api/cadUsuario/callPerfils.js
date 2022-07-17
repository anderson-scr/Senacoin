import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callPerfilAPI = {
  ativo: async () => {

    try {
      const call = await api.get(routes.perfil.ativo)
        return call.data
  
  
    } catch (error) {
      console.log(error)
    }
  }
}
