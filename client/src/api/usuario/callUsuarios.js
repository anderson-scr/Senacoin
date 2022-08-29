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
      const apiResponse = await api.get(routes.colaborador.todos)
      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      ModalService.open(ModalCadErro)
    }
  },
  buscaUsuario: async (userId) => {
    try {
      const apiResponse = await api.get(routes.colaborador.buscaColaborador + userId)
      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      ModalService.open(ModalCadErro)
    }
  },
  atualizarUsuario: async (userId, userInfo) => {
    try {
      await api.patch(routes.colaborador.atualizarColaborador + userId, JSON.stringify(userInfo))

      ModalService.open(ModalCadCorreto)
    } catch (error) {
      ModalService.open(ModalCadErro)
    }
  },
  inativaUsuario: async (userId) => {
    try {
      await api.delete(routes.colaborador.inativaColaboraor + userId, JSON.stringify({ativo: false}))
      
      ModalService.open(ModalCadCorreto)
    } catch (error) {
      ModalService.open(ModalCadErro)
    }
  }
}