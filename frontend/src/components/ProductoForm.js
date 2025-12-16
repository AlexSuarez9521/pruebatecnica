import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { productoService } from '../services/api';
import { VALIDATION_MESSAGES, ERROR_MESSAGES } from '../utils/constants';

/**
 * Formulario para crear/editar productos
 */
const ProductoForm = ({ productoToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidadStock: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const isEditing = !!productoToEdit;

  const resetForm = useCallback(() => {
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      cantidadStock: '',
    });
    setErrors({});
    setSubmitError(null);
  }, []);

  useEffect(() => {
    if (productoToEdit) {
      setFormData({
        nombre: productoToEdit.nombre || '',
        descripcion: productoToEdit.descripcion || '',
        precio: productoToEdit.precio?.toString() || '',
        cantidadStock: productoToEdit.cantidadStock?.toString() || '',
      });
    } else {
      resetForm();
    }
  }, [productoToEdit, resetForm]);

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = VALIDATION_MESSAGES.REQUIRED_NAME;
    }

    if (!formData.precio) {
      newErrors.precio = VALIDATION_MESSAGES.REQUIRED_PRICE;
    } else if (isNaN(formData.precio) || parseFloat(formData.precio) <= 0) {
      newErrors.precio = VALIDATION_MESSAGES.INVALID_PRICE;
    }

    if (!formData.cantidadStock) {
      newErrors.cantidadStock = VALIDATION_MESSAGES.REQUIRED_STOCK;
    } else if (isNaN(formData.cantidadStock) || parseInt(formData.cantidadStock) < 0) {
      newErrors.cantidadStock = VALIDATION_MESSAGES.INVALID_STOCK;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setLoading(true);

    const productoData = {
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim() || null,
      precio: parseFloat(formData.precio),
      cantidadStock: parseInt(formData.cantidadStock),
    };

    try {
      if (isEditing) {
        await productoService.update(productoToEdit.id, productoData);
      } else {
        await productoService.create(productoData);
      }
      resetForm();
      if (onSave) onSave();
    } catch (err) {
      console.error('Error saving product:', err);
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setSubmitError(
          err.response?.data?.message || ERROR_MESSAGES.SAVE_PRODUCT
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    if (onCancel) onCancel();
  };

  return (
    <div className="producto-form">
      <h2>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>

      {submitError && <div className="error-message">{submitError}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={errors.nombre ? 'error' : ''}
            placeholder="Nombre del producto"
          />
          {errors.nombre && <span className="field-error">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción del producto (opcional)"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="precio">Precio *</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className={errors.precio ? 'error' : ''}
              placeholder="0.00"
              step="0.01"
              min="0.01"
            />
            {errors.precio && <span className="field-error">{errors.precio}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cantidadStock">Cantidad en Stock *</label>
            <input
              type="number"
              id="cantidadStock"
              name="cantidadStock"
              value={formData.cantidadStock}
              onChange={handleChange}
              className={errors.cantidadStock ? 'error' : ''}
              placeholder="0"
              min="0"
            />
            {errors.cantidadStock && (
              <span className="field-error">{errors.cantidadStock}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear'}
          </button>
          {isEditing && (
            <button type="button" className="btn-secondary" onClick={handleCancel}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

ProductoForm.propTypes = {
  productoToEdit: PropTypes.shape({
    id: PropTypes.number,
    nombre: PropTypes.string,
    descripcion: PropTypes.string,
    precio: PropTypes.number,
    cantidadStock: PropTypes.number,
  }),
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

ProductoForm.defaultProps = {
  productoToEdit: null,
  onSave: null,
  onCancel: null,
};

export default ProductoForm;
