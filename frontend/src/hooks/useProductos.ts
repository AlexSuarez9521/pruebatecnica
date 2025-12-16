import { useState, useEffect, useCallback } from 'react';
import { productoService } from '../services/api';
import { ERROR_MESSAGES } from '../utils/constants';
import type { Producto, ProductoCreateDTO, OperationResult, UseProductosReturn } from '../types';

/**
 * Custom Hook para gestionar productos
 * Encapsula la lógica de carga, CRUD y estado de productos
 */
const useProductos = (refreshKey: number = 0): UseProductosReturn => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await productoService.getAll();
      setProductos(response.data);
    } catch (err) {
      setError(ERROR_MESSAGES.LOAD_PRODUCTS);
      console.error('Error fetching productos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos, refreshKey]);

  const deleteProducto = useCallback(async (id: number): Promise<OperationResult> => {
    try {
      await productoService.delete(id);
      await fetchProductos();
      return { success: true };
    } catch (err) {
      console.error('Error deleting producto:', err);
      return { success: false, error: ERROR_MESSAGES.DELETE_PRODUCT };
    }
  }, [fetchProductos]);

  const createProducto = useCallback(async (producto: ProductoCreateDTO): Promise<OperationResult<Producto>> => {
    try {
      const response = await productoService.create(producto);
      await fetchProductos();
      return { success: true, data: response.data };
    } catch (err: any) {
      console.error('Error creating producto:', err);
      return {
        success: false,
        error: err.response?.data?.message || ERROR_MESSAGES.SAVE_PRODUCT,
        validationErrors: err.response?.data?.errors,
      };
    }
  }, [fetchProductos]);

  const updateProducto = useCallback(async (id: number, producto: ProductoCreateDTO): Promise<OperationResult<Producto>> => {
    try {
      const response = await productoService.update(id, producto);
      await fetchProductos();
      return { success: true, data: response.data };
    } catch (err: any) {
      console.error('Error updating producto:', err);
      return {
        success: false,
        error: err.response?.data?.message || ERROR_MESSAGES.SAVE_PRODUCT,
        validationErrors: err.response?.data?.errors,
      };
    }
  }, [fetchProductos]);

  return {
    productos,
    loading,
    error,
    fetchProductos,
    deleteProducto,
    createProducto,
    updateProducto,
  };
};

export default useProductos;
