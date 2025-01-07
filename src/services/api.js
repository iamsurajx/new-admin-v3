import axios from 'axios';

const API_URL = "https://backendv3-wmen.onrender.com/admin-auth";

// Signup API call
export const registerAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login API call
export const loginAdmin = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
