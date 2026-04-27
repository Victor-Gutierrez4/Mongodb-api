// Name: Victor Gutierrez
// Date: 4/27/26
// Course: IT-302
// Section: [452]
// Assignment: Phase 5 C.U.D. Node.js Data using React.js
// Email: vag@njit.edu

import axios from "axios"

const API_URL =
  (process.env.REACT_APP_BACKEND_URL || "http://localhost:5000") +
  "/api/v1/vag/breweries"

class BreweriesDataService {
  getAll() {
    return axios.get(API_URL)
  }

  find(name) {
    return axios.get(`${API_URL}?name=${name}`)
  }

  get(id) {
    return axios.get(`${API_URL}/id/${id}`)
  }

  getComments(breweryId) {
    return axios.get(`${API_URL}/comments/${breweryId}`)
  }

  createComment(data) {
    return axios.post(`${API_URL}/comments`, data)
  }

  updateComment(data) {
    return axios.put(`${API_URL}/comments`, data)
  }

  deleteComment(data) {
    return axios.delete(`${API_URL}/comments`, { data: data })
  }
}

const breweriesDataService = new BreweriesDataService()
export default breweriesDataService