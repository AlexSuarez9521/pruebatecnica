export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  TIMEOUT: 10000,
} as const;

export const SORT_DIRECTIONS = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type SortDirection = typeof SORT_DIRECTIONS[keyof typeof SORT_DIRECTIONS];

export const NUMERIC_FIELDS: readonly string[] = ['id', 'precio', 'cantidadStock'];

export const ERROR_MESSAGES = {
  LOAD_PRODUCTS: 'Error al cargar los productos',
  DELETE_PRODUCT: 'Error al eliminar el producto',
  SAVE_PRODUCT: 'Error al guardar el producto',
  LOAD_INVENTORY: 'Error al cargar el resumen del inventario',
  LOAD_COMBINATIONS: 'Error al buscar combinaciones',
  GENERIC: 'Ha ocurrido un error. Por favor, intente nuevamente.',
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED_NAME: 'El nombre es obligatorio',
  REQUIRED_PRICE: 'El precio es obligatorio',
  INVALID_PRICE: 'El precio debe ser un número mayor a 0',
  REQUIRED_STOCK: 'La cantidad en stock es obligatoria',
  INVALID_STOCK: 'La cantidad debe ser un número no negativo',
  INVALID_VALUE: 'Ingrese un valor mayor a 0',
} as const;

export const TABLE_CONFIG = {
  DEFAULT_SORT_KEY: 'id',
  DEFAULT_SORT_DIRECTION: SORT_DIRECTIONS.ASC,
} as const;
