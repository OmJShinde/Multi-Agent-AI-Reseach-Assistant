import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const searchResearch = async (query) => {
    try {
        const response = await api.post('query/', { query });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export default api;
