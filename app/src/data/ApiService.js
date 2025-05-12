import axios from 'axios';
import apiConfig from '../config/apiConfig';

class ApiService {
  constructor(token = '') {
    this.api = axios.create({
      baseURL:  apiConfig.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '', 
      },
    });
  }


  setAuthToken(token) {
    this.api.defaults.headers['Authorization'] = token ? `Bearer ${token}` : '';
  }

  // GET Request
  async get(url, config = {}) {
    try {
      const response = await this.api.get(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // POST Request
  async post(url, data, config = {}) {
    try {
      const response = await this.api.post(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // PUT Request
  async put(url, data, config = {}) {
    try {
      const response = await this.api.put(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // DELETE Request
  async delete(url, config = {}) {
    try {
      const response = await this.api.delete(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Error Handling Method
  handleError(error) {
    if (error.response) {
      // The server responded with a status other than 2xx
      console.error('Error Response:', error.response.data);
      console.error('Status Code:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error Request:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error Message:', error.message);
    }
    throw error; // You can also throw the error or handle it further
  }
}

export default ApiService;
