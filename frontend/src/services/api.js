import axios from 'axios';
import { API_CONFIG } from '../utils/constants';

/**
 * Instancia de Axios configurada para el API
 */
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Servicios para gestión de Productos
 */
export const productoService = {
  getAll: () => api.get('/productos'),
  getById: (id) => api.get(`/productos/${id}`),
  create: (producto) => api.post('/productos', producto),
  update: (id, producto) => api.put(`/productos/${id}`, producto),
  delete: (id) => api.delete(`/productos/${id}`),
  getResumenInventario: () => api.get('/productos/inventario/resumen'),
  getCombinaciones: (valorMaximo) => api.get(`/productos/combinaciones/${valorMaximo}`),
};

/**
 * Servicios para APIs externas
 */
export const externalApiService = {
  getCatFacts: async (count = 2) => {
    try {
      const response = await axios.get(
        `https://meowfacts.herokuapp.com/?count=${count}&lang=esp`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching cat facts:', error);
      return [];
    }
  },

  getUselessFact: async () => {
    try {
      const response = await axios.get(
        'https://uselessfacts.jsph.pl/api/v2/facts/today'
      );
      return response.data.text;
    } catch (error) {
      console.error('Error fetching useless fact:', error);
      return 'No se pudo cargar el dato del día.';
    }
  },
};

export default api;
