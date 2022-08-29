import { routes } from 'api/routes/routes'
import api from '../routes/default'

export const callCalendarAPI = {
  dataVencimentoQrcode: async (offset) => {
    try {
      const apiResponse = await api.get(routes.qrcode.todos + offset)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else {
        const filteredList= []
        apiResponse.data.forEach(qrcode => {
          filteredList.push({
            title: 'Qrcode',
            itemName: qrcode.nome,
            start: (qrcode.data_fim).substring(0, 10),
            end: (qrcode.data_fim).substring(0, 10)
          })
        })
        return filteredList
      }
    }
    catch (error) {
      console.log(error)
    }
  },
  dataVencimentoEvento: async (offset) => {
    try {
      const apiResponse = await api.get(routes.evento.todos + offset)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else {
        const filteredList= []
        apiResponse.data.forEach(dateEvent => {
          filteredList.push({
            title: 'Evento', 
            start: (dateEvent.data_fim).substring(0, 10),
            end: (dateEvent.data_fim).substring(0, 10)
          })
        })
        return filteredList
      }
    }
    catch (error) {
      console.log(error)
    }
  },
  dataVencimentoServico: async (offset) => {
    try {
      const apiResponse = await api.get(routes.servico.todos + offset)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else {
        const filteredList= []
        apiResponse.data.forEach(servico => {
          filteredList.push({
            title: 'Servico', 
            itemName: servico.nome,
            start: (servico.data_fim).substring(0, 10),
            end: (servico.data_fim).substring(0, 10)
          })
        })
        return filteredList
      }
    }
    catch (error) {
      console.log(error)
    }
  },
  dataVencimentoPromocao: async (offset) => {
    try {
      const apiResponse = await api.get(routes.promocao.todos)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else {
        const filteredList= []
        apiResponse.data.forEach((promocao, idx) => {
          filteredList.push({
            title: 'Promoção',
            backgroundColor: 'rgb(225, 126, 28)',
            borderColor: 'rgb(225, 126, 28)',
            itemName: promocao.nome,
            start: (promocao.data_fim).substring(0, 10),
            end: (promocao.data_fim).substring(0, 10)
          })
        })
        return filteredList
      }
    }
    catch (error) {
      console.log(error)
    }
  }
}