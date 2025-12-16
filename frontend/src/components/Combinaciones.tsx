import React, { useState, FormEvent, ChangeEvent } from 'react';
import { productoService } from '../services/api';
import { formatCurrency } from '../utils/formatters';
import { ERROR_MESSAGES, VALIDATION_MESSAGES } from '../utils/constants';
import type { CombinacionProducto } from '../types';

/**
 * Componente para buscar combinaciones de productos
 */
const Combinaciones: React.FC = () => {
  const [valorMaximo, setValorMaximo] = useState<string>('');
  const [combinaciones, setCombinaciones] = useState<CombinacionProducto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!valorMaximo || parseFloat(valorMaximo) <= 0) {
      setError(VALIDATION_MESSAGES.INVALID_VALUE);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await productoService.getCombinaciones(valorMaximo);
      setCombinaciones(response.data);
      setSearched(true);
    } catch (err) {
      setError(ERROR_MESSAGES.LOAD_COMBINATIONS);
      console.error('Error fetching combinations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValorMaximo(e.target.value);
  };

  return (
    <div className="combinaciones">
      <h3>Combinaciones de Productos</h3>
      <p className="combinaciones-info">
        Encuentra combinaciones de productos (2-3 productos) cuya suma de precios
        sea menor o igual al valor ingresado.
      </p>

      <form onSubmit={handleSearch} className="combinaciones-form">
        <div className="form-inline">
          <label htmlFor="valorMaximo">Valor máximo a gastar:</label>
          <input
            type="number"
            id="valorMaximo"
            value={valorMaximo}
            onChange={handleInputChange}
            placeholder="Ej: 1000000"
            min="0"
            step="0.01"
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </form>

      {error && <div className="error-message">{error}</div>}

      {searched && !loading && (
        <div className="combinaciones-resultado">
          {combinaciones.length === 0 ? (
            <p className="no-results">
              No se encontraron combinaciones de productos para el valor ingresado.
            </p>
          ) : (
            <>
              <h4>
                Combinaciones encontradas ({combinaciones.length})
              </h4>
              <table className="combinaciones-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Productos</th>
                    <th>Suma de Precios</th>
                  </tr>
                </thead>
                <tbody>
                  {combinaciones.map((combo, index) => {
                    const productos = combo.slice(0, -1) as string[];
                    const suma = combo[combo.length - 1] as number;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{productos.join(' + ')}</td>
                        <td>{formatCurrency(suma)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Combinaciones;
