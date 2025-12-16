/**
 * Definiciones de tipos para la aplicación
 */

// ============================================
// Entidades
// ============================================

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: number;
  cantidadStock: number;
}

export interface ProductoFormData {
  nombre: string;
  descripcion: string;
  precio: string;
  cantidadStock: string;
}

export interface ProductoCreateDTO {
  nombre: string;
  descripcion: string | null;
  precio: number;
  cantidadStock: number;
}

// ============================================
// DTOs de respuesta del API
// ============================================

export interface InventarioResumen {
  valorTotalInventario: number;
  totalProductos: number;
  productoMayorValor: Producto | null;
}

export type CombinacionProducto = (string | number)[];

// ============================================
// Estados y configuración
// ============================================

export interface SortConfig {
  key: keyof Producto | string;
  direction: 'asc' | 'desc';
}

export interface FormErrors {
  [key: string]: string | null;
}

// ============================================
// Respuestas de operaciones
// ============================================

export interface OperationResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  validationErrors?: FormErrors;
}

// ============================================
// Props de componentes
// ============================================

export interface ProductoListProps {
  onEdit: (producto: Producto) => void;
  onRefresh?: () => void;
  refreshKey?: number;
}

export interface ProductoFormProps {
  productoToEdit: Producto | null;
  onSave?: () => void;
  onCancel?: () => void;
}

export interface InventarioResumenProps {
  refreshKey?: number;
}

// ============================================
// Hook returns
// ============================================

export interface UseProductosReturn {
  productos: Producto[];
  loading: boolean;
  error: string | null;
  fetchProductos: () => Promise<void>;
  deleteProducto: (id: number) => Promise<OperationResult>;
  createProducto: (producto: ProductoCreateDTO) => Promise<OperationResult<Producto>>;
  updateProducto: (id: number, producto: ProductoCreateDTO) => Promise<OperationResult<Producto>>;
}

export interface UseSortingReturn<T> {
  sortedData: T[];
  sortConfig: SortConfig;
  requestSort: (key: string) => void;
  getSortIndicator: (key: string) => string;
}
