import axios from "axios";

export default axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
  headers: {
    'Authorization': async () => {
      const accessToken = JSON.parse(await localStorage.getItem('accessToken'))
      return accessToken
    },
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  } 
})