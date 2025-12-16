import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { productoService } from '../services/api';
import { formatCurrency } from '../utils/formatters';
import { ERROR_MESSAGES } from '../utils/constants';

/**
 * Componente para mostrar el resumen del inventario
 */
const InventarioResumen = ({ refreshKey }) => {
  const [resumen, setResumen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResumen = useCallback(async () => {
    try {
      setLoading(true);
      const response = await productoService.getResumenInventario();
      setResumen(response.data);
      setError(null);
    } catch (err) {
      setError(ERROR_MESSAGES.LOAD_INVENTORY);
      console.error('Error fetching inventory summary:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResumen();
  }, [fetchResumen, refreshKey]);

  if (loading) return <div className="loading-small">Cargando resumen...</div>;
  if (error) return <div className="error-small">{error}</div>;

  return (
    <div className="inventario-resumen">
      <h3>Resumen del Inventario</h3>

      <div className="resumen-cards">
        <div className="resumen-card">
          <span className="resumen-label">Valor Total del Inventario</span>
          <span className="resumen-value valor-total">
            {formatCurrency(resumen?.valorTotalInventario)}
          </span>
        </div>

        {resumen?.productoMayorValor && (
          <div className="resumen-card">
            <span className="resumen-label">Producto con Mayor Valor en Inventario</span>
            <div className="producto-mayor">
              <span className="producto-nombre">
                {resumen.productoMayorValor.nombre}
              </span>
              <span className="producto-valor">
                {formatCurrency(
                  resumen.productoMayorValor.precio *
                    resumen.productoMayorValor.cantidadStock
                )}
              </span>
              <span className="producto-detalle">
                ({formatCurrency(resumen.productoMayorValor.precio)} x{' '}
                {resumen.productoMayorValor.cantidadStock} unidades)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

InventarioResumen.propTypes = {
  refreshKey: PropTypes.number,
};

InventarioResumen.defaultProps = {
  refreshKey: 0,
};

export default InventarioResumen;
