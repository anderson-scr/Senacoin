import api from '../routes/default';
import { routes } from "api/routes/routes";

// Modal
import ModalService from 'common/modal/services/modalService'
import ModalCadErro from 'common/preMadeModal/resultados/cadErro'
import ModalCadCorreto from 'common/preMadeModal/resultados/cadCorreto'

export const callUsuarioAPI = {
  novo: async (userInfo) => {
    try {
      const call = await api.post(routes.colaborador.novo, JSON.stringify(userInfo))
        ModalService.open(ModalCadCorreto)
        return call.data

    } catch (error) {
      console.log(error)
      ModalService.open(ModalCadErro)
    }
  },
  todos: async () => {
    try {
      const todosColaboradores = await api.get(routes.colaborador.todos)
        return todosColaboradores.data

    } catch (error) {
      ModalService.open(ModalCadErro)
    }
  }
}