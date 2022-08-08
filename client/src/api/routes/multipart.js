import axios from "axios";

export default axios.create({
  baseURL: 'http://localhost:5000/api/v1/',
  headers: {
    'Authorization': JSON.parse(localStorage.getItem('accessToken')),
    'Accept': 'multipart/form-data',
    'Content-Type': 'multipart/form-data'
  }
})