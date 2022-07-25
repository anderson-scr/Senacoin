import api from '../routes/default';
import { routes } from "api/routes/routes";

// Modal
import ModalService from 'common/modal/services/modalService'
import ModalCadErro from 'common/preMadeModal/resultados/cadErro'
import ModalCadCorreto from 'common/preMadeModal/resultados/cadCorreto'

export const callSubcategoriaAPI = {
  ativo: async () => {
    try {
      const call = await api.get(routes.subcategoria.ativo)
      return call.data
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
