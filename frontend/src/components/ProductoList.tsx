import React from 'react';
import useProductos from '../hooks/useProductos';
import useSorting from '../hooks/useSorting';
import { formatCurrency } from '../utils/formatters';
import type { Producto, ProductoListProps } from '../types';

/**
 * Componente para mostrar la lista de productos con ordenamiento
 */
const ProductoList: React.FC<ProductoListProps> = ({ onEdit, onRefresh, refreshKey = 0 }) => {
  const { productos, loading, error, deleteProducto } = useProductos(refreshKey);
  const { sortedData, requestSort, getSortIndicator } = useSorting<Producto>(productos);

  const handleDelete = async (id: number): Promise<void> => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      const result = await deleteProducto(id);
      if (result.success && onRefresh) {
        onRefresh();
      }
    }
  };

  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="producto-list">
      <h2>Lista de Productos</h2>
      <p className="sort-hint">Haz clic en los encabezados para ordenar</p>

      {productos.length === 0 ? (
        <p className="no-data">No hay productos registrados</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort('id')} className="sortable">
                ID{getSortIndicator('id')}
              </th>
              <th onClick={() => requestSort('nombre')} className="sortable">
                Nombre{getSortIndicator('nombre')}
              </th>
              <th onClick={() => requestSort('descripcion')} className="sortable">
                Descripción{getSortIndicator('descripcion')}
              </th>
              <th onClick={() => requestSort('precio')} className="sortable">
                Precio{getSortIndicator('precio')}
              </th>
              <th onClick={() => requestSort('cantidadStock')} className="sortable">
                Stock{getSortIndicator('cantidadStock')}
              </th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion || '-'}</td>
                <td>{formatCurrency(producto.precio)}</td>
                <td>{producto.cantidadStock}</td>
                <td className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => onEdit(producto)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductoList;
