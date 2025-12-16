import { useState, useMemo, useCallback } from 'react';
import { SORT_DIRECTIONS, NUMERIC_FIELDS, TABLE_CONFIG } from '../utils/constants';
import type { SortConfig, UseSortingReturn } from '../types';

const useSorting = <T extends Record<string, any>>(
  data: T[],
  initialConfig: Partial<SortConfig> = {}
): UseSortingReturn<T> => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: initialConfig.key || TABLE_CONFIG.DEFAULT_SORT_KEY,
    direction: initialConfig.direction || TABLE_CONFIG.DEFAULT_SORT_DIRECTION,
  });

  const requestSort = useCallback((key: string): void => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === SORT_DIRECTIONS.ASC
          ? SORT_DIRECTIONS.DESC
          : SORT_DIRECTIONS.ASC,
    }));
  }, []);

  const sortedData = useMemo((): T[] => {
    if (!data || data.length === 0) return [];

    const sortableData = [...data];

    sortableData.sort((a, b) => {
      let aValue: any = a[sortConfig.key];
      let bValue: any = b[sortConfig.key];

      if (NUMERIC_FIELDS.includes(sortConfig.key)) {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      } else if (typeof aValue === 'string') {
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

  const getSortIndicator = useCallback((key: string): string => {
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
