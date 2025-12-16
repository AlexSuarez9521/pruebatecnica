import { useState, useMemo, useCallback } from 'react';
import { SORT_DIRECTIONS, NUMERIC_FIELDS, TABLE_CONFIG } from '../utils/constants';

/**
 * Custom Hook para ordenamiento de tablas
 * @param {Array} data - Datos a ordenar
 * @param {Object} initialConfig - Configuración inicial de ordenamiento
 */
const useSorting = (data, initialConfig = {}) => {
  const [sortConfig, setSortConfig] = useState({
    key: initialConfig.key || TABLE_CONFIG.DEFAULT_SORT_KEY,
    direction: initialConfig.direction || TABLE_CONFIG.DEFAULT_SORT_DIRECTION,
  });

  const requestSort = useCallback((key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === SORT_DIRECTIONS.ASC
          ? SORT_DIRECTIONS.DESC
          : SORT_DIRECTIONS.ASC,
    }));
  }, []);

  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];

    const sortableData = [...data];

    sortableData.sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Manejar valores numéricos
      if (NUMERIC_FIELDS.includes(sortConfig.key)) {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      } else if (typeof aValue === 'string') {
        // Manejar strings (case insensitive)
        aValue = aValue?.toLowerCase() || '';
        bValue = bValue?.toLowerCase() || '';
      }

      if (aValue < bValue) {
        return sortConfig.direction === SORT_DIRECTIONS.ASC ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === SORT_DIRECTIONS.ASC ? 1 : -1;
      }
      return 0;
    });

    return sortableData;
  }, [data, sortConfig]);

  const getSortIndicator = useCallback((key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === SORT_DIRECTIONS.ASC ? ' ▲' : ' ▼';
  }, [sortConfig]);

  return {
    sortedData,
    sortConfig,
    requestSort,
    getSortIndicator,
  };
};

export default useSorting;
