import { routes } from 'api/routes/routes'
import api from '../routes/default'

// Modal
import ModalService from 'common/modal/services/modalService'
import ModalCadErro from 'common/preMadeModal/resultados/cadErro'
import ModalCadCorreto from 'common/preMadeModal/resultados/cadCorreto'

export const callUnidadeAPI = {
  ativo: async () => {
    try {
      const apiResponse = await api.get(routes.unidade.ativo)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      ModalService.open(ModalCadErro)
    }
  },
  novo: async (unidadeInfo) => {
    try {
      const register = await api.post(routes.unidade.novo, JSON.stringify(unidadeInfo))
        ModalService.open(ModalCadCorreto)
        return register.data
    } catch (error) {
      ModalService.open(ModalCadErro)
    }
  },
}
