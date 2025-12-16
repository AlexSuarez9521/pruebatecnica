/**
 * Utilidades de formateo para la aplicación
 */

/**
 * Formatea un valor numérico como moneda colombiana (COP)
 */
export const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '$0';

  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formatea una fecha en formato legible
 */
export const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return '-';

  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Trunca un texto a una longitud máxima
 */
export const truncateText = (text: string | null | undefined, maxLength: number = 50): string => {
  if (!text) return '-';
  if (text.length <= maxLength) return text;

  return `${text.substring(0, maxLength)}...`;
};
