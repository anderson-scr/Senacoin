import api from '../routes/default';
import { routes } from "api/routes/routes"

export const callDashboardAPI = {
  calendarioTodos: async () => {
    try {
      const apiResponse = await api.get(routes.dashboard.todos)
      
      // If there's no data in the apiResponse, return a empty array for fullcalendar
      if(apiResponse.status === 204) {
        return []
      } else {
        const filteredList= []
        const tempList = apiResponse.data.data
        tempList.forEach(element => {
          filteredList.push({
            ...element,
            start: (element.start).substring(0, 10),
            end: (element.end).substring(0, 10)
          })
        })
        return filteredList
      }

    } catch(error) {
      console.log(error)
    }
  }
}