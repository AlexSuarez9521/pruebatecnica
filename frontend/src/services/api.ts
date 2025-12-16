import axios, { AxiosResponse } from 'axios';
import { API_CONFIG } from '../utils/constants';
import type { Producto, ProductoCreateDTO, InventarioResumen, CombinacionProducto } from '../types';

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
  getAll: (): Promise<AxiosResponse<Producto[]>> =>
    api.get('/productos'),

  getById: (id: number): Promise<AxiosResponse<Producto>> =>
    api.get(`/productos/${id}`),

  create: (producto: ProductoCreateDTO): Promise<AxiosResponse<Producto>> =>
    api.post('/productos', producto),

  update: (id: number, producto: ProductoCreateDTO): Promise<AxiosResponse<Producto>> =>
    api.put(`/productos/${id}`, producto),

  delete: (id: number): Promise<AxiosResponse<void>> =>
    api.delete(`/productos/${id}`),

  getResumenInventario: (): Promise<AxiosResponse<InventarioResumen>> =>
    api.get('/productos/inventario/resumen'),

  getCombinaciones: (valorMaximo: number | string): Promise<AxiosResponse<CombinacionProducto[]>> =>
    api.get(`/productos/combinaciones/${valorMaximo}`),
};

/**
 * Interfaces para APIs externas
 */
interface MeowFactsResponse {
  data: string[];
}

interface UselessFactResponse {
  id: string;
  text: string;
  source: string;
  source_url: string;
  language: string;
  permalink: string;
}

/**
 * Servicios para APIs externas
 */
export const externalApiService = {
  getCatFacts: async (count: number = 2): Promise<string[]> => {
    try {
      const response = await axios.get<MeowFactsResponse>(
        `https://meowfacts.herokuapp.com/?count=${count}&lang=esp`
      );
      return response.data.data;
    } catch (error) {
      console.error('Error fetching cat facts:', error);
      return [];
    }
  },

  getUselessFact: async (): Promise<string> => {
    try {
      const response = await axios.get<UselessFactResponse>(
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
