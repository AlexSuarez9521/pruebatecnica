import React, { useState, useCallback } from 'react';
import ProductoList from './components/ProductoList';
import ProductoForm from './components/ProductoForm';
import InventarioResumen from './components/InventarioResumen';
import Combinaciones from './components/Combinaciones';
import CatFactsModal from './components/CatFactsModal';
import UselessFactFooter from './components/UselessFactFooter';
import type { Producto } from './types';
import './App.css';

/**
 * Componente principal de la aplicación
 */
const App: React.FC = () => {
  const [productoToEdit, setProductoToEdit] = useState<Producto | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleEdit = useCallback((producto: Producto): void => {
    setProductoToEdit(producto);
    document.querySelector('.producto-form')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSave = useCallback((): void => {
    setProductoToEdit(null);
    setRefreshKey((prev) => prev + 1);
  }, []);

  const handleCancel = useCallback((): void => {
    setProductoToEdit(null);
  }, []);

  const handleRefresh = useCallback((): void => {
    setRefreshKey((prev) => prev + 1);
  }, []);

  return (
    <div className="app">
      {/* Modal de datos de gatos */}
      <CatFactsModal />

      {/* Header */}
      <header className="app-header">
        <h1>🛒 Gestión de Productos</h1>
        <p>Sistema CRUD - Prueba Técnica</p>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {/* Resumen del Inventario */}
        <section className="section">
          <InventarioResumen refreshKey={refreshKey} />
        </section>

        {/* Formulario de Producto */}
        <section className="section">
          <ProductoForm
            productoToEdit={productoToEdit}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </section>

        {/* Lista de Productos */}
        <section className="section">
          <ProductoList
            onEdit={handleEdit}
            onRefresh={handleRefresh}
            refreshKey={refreshKey}
          />
        </section>

        {/* Combinaciones de Productos */}
        <section className="section">
          <Combinaciones />
        </section>
      </main>

      {/* Footer con dato inútil */}
      <UselessFactFooter />
    </div>
  );
};

export default App;
