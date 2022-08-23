import api from '../routes/default';
import { routes } from "api/routes/routes"


// Modal
import ModalService from 'common/modal/services/modalService'
import ModalCadErro from 'common/preMadeModal/resultados/cadErro'
import ModalCadCorreto from 'common/preMadeModal/resultados/cadCorreto'

export const callQrcodeAPI = {
  novo: async (dadosQrcode) => {
    try {
      const apiResponse = await api.post(routes.qrcode.novo, JSON.stringify(dadosQrcode))
      ModalService.open(ModalCadCorreto)
      console.log(apiResponse)

    } catch (error) {
      ModalService.open(ModalCadErro)
      console.log(error)
    }
  },
  todos: async (offset) => {
    try {
      const apiResponse = await api.get(routes.qrcode.todos + offset)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  },
  paraVencer: async (offset) => {
    try {
      const apiResponse = await api.get(routes.qrcode.todos + offset)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else {
        const sortedByDate = apiResponse.data.sort((a, b) => {
          return a.data_fim - b.data_fim
        })
        const lastFour = sortedByDate.slice(0, 4)
        lastFour.forEach((date, idx) => {
          lastFour[idx].data_fim = date.data_fim.slice(0, 10)
        })
        console.log(lastFour)
        return lastFour
      }
    } catch (error) {
      console.log(error)
    }
  }
}