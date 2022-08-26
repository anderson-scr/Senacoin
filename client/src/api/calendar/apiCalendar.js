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
        apiResponse.data.forEach(dateEvent => {
          filteredList.push({
            title: 'Qrcode', 
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
  }
}