import axios from 'axios';

const API = axios.create({
  baseURL: 'https://rentify-backend-0cjm.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginApi = async (data) => {
  console.log('Sending login request for email:', data.email); // Safe debug
  const response = await API.post('/auth/login', data);
  console.log('Login response received for email:', data.email); // Safe debug
  return response;
};

export const registerApi = async (data) => {
  console.log('Sending register request for email:', data.email); // Safe debug
  const response = await API.post('/auth/register', data);
  console.log('Register response received for email:', data.email); // Safe debug
  return response;
};

export const allGadgetsApi = async (search = '') => {
  const response = await API.get(`/gadgets/all${search ? `?search=${search}` : ''}`);
  return response;
};

export const sampleGadgetsApi = async () => {
  const response = await API.get('/gadgets/sample');
  return response;
};

export const getGadgetByIdApi = async (id) => {
  const response = await API.get(`/gadgets/${id}`);
  return response;
};

export const addGadgetApi = async (data) => {
  const response = await API.post('/gadgets/add', data);
  return response;
};

export const updateGadgetApi = async (id, data) => {
  const response = await API.put(`/gadgets/update/${id}`, data);
  return response;
};

export const deleteGadgetApi = async (id) => {
  const response = await API.delete(`/gadgets/delete/${id}`);
  return response;
};

export const initiatePaymentApi = async (data) => {
  const response = await API.post('/payment/initiate-payment', data);
  return response;
};

export const verifyPaymentApi = async (data) => {
  const response = await API.post('/payment/verify-payment', data);
  return response;
};

export const userRentalsApi = async () => {
  const response = await API.get('/rental/user-rentals');
  return response;
};

export const allRentalsApi = async () => {
  const response = await API.get('/rental/all');
  return response;
};

export const createReviewApi = async (data) => {
  const response = await API.post('/review/create', data);
  return response;
};

export const getRentalReviewsApi = async (rentalId) => {
  const response = await API.get(`/review/rental/${rentalId}`);
  return response;
};

export const allReviewsApi = async () => {
  const response = await API.get('/review/all');
  return response;
};