import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

class UserService {
  
  async login(data) {
    const result = await axios.post(`${API_URL}/auth/login`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return result;
  }
  async list() {
    const users = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
  }});
    return users;
  }
  async get(email) {
    const user = await axios.get(`${API_URL}/users/${encodeURIComponent(email)}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return user;
  }
  async create(data) {
    const result = await axios.post(`${API_URL}/users`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return result;
  }
  async delete(email) {
    const result = await axios.delete(`${API_URL}/users/${encodeURIComponent(email)}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return result;
  }

  async update(email, data) {
    const result = await axios.put(`${API_URL}/users/${encodeURIComponent(email)}`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return result;
  }
}

export default UserService;
