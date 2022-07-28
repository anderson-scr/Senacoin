import api from '../routes/default';
import { routes } from "api/routes/routes";

// Modal
import ModalService from 'common/modal/services/modalService'
import ModalCadErro from 'common/preMadeModal/resultados/cadErro'
import ModalCadCorreto from 'common/preMadeModal/resultados/cadCorreto'

export const callSubcategoriaAPI = {
  ativo: async () => {
    try {
      const apiResponse = await api.get(routes.subcategoria.ativo)
      
      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data
    } catch (error) {
      ModalService.open(ModalCadErro)
    }
  },
  novo: async (subcategoriaInfo) => {
    try {
      const register = await api.post(routes.subcategoria.novo, JSON.stringify(subcategoriaInfo))
        ModalService.open(ModalCadCorreto)
    } catch (error) {
      ModalService.open(ModalCadErro)
    }
  },
}
