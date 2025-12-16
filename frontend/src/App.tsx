import React, { useState, useCallback } from 'react';
import ProductoList from './components/ProductoList';
import ProductoForm from './components/ProductoForm';
import InventarioResumen from './components/InventarioResumen';
import Combinaciones from './components/Combinaciones';
import CatFactsModal from './components/CatFactsModal';
import UselessFactFooter from './components/UselessFactFooter';
import type { Producto } from './types';
import './App.css';

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
      <CatFactsModal />

      <header className="app-header">
        <h1>🛒 Gestión de Productos</h1>
        <p>Sistema CRUD - Prueba Técnica</p>
      </header>

      <main className="app-main">
        <section className="section">
          <InventarioResumen refreshKey={refreshKey} />
        </section>

        <section className="section">
          <ProductoForm
            productoToEdit={productoToEdit}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </section>

        <section className="section">
          <ProductoList
            onEdit={handleEdit}
            onRefresh={handleRefresh}
            refreshKey={refreshKey}
          />
        </section>

        <section className="section">
          <Combinaciones />
        </section>
      </main>

      <UselessFactFooter />
    </div>
  );
};

export default App;
