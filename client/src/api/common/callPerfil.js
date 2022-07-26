import { routes } from "api/routes/routes"
import api from '../routes/default'

export const callPerfilAPI = {
  ativo: async () => {
    try {
      const perfis = await api.get(routes.perfil.ativo)
        return perfis.data
        
    } catch (error) {
      console.log(error)
    }
  }
}
