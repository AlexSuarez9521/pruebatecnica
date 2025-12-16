import React, { useState, useEffect } from 'react';
import { externalApiService } from '../services/api';

/**
 * Modal que muestra datos curiosos sobre gatos
 */
const CatFactsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [catFacts, setCatFacts] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCatFacts = async (): Promise<void> => {
      try {
        setLoading(true);
        const facts = await externalApiService.getCatFacts(2);
        setCatFacts(facts);
      } catch (err) {
        console.error('Error loading cat facts:', err);
        setCatFacts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCatFacts();
  }, []);

  const handleClose = (): void => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>🐱 Sabías que...</h2>
          <button className="modal-close" onClick={handleClose}>
            ×
          </button>
        </div>
        <div className="modal-body">
          {loading ? (
            <p>Cargando datos curiosos sobre gatos...</p>
          ) : catFacts.length > 0 ? (
            <ul className="cat-facts-list">
              {catFacts.map((fact, index) => (
                <li key={index}>
                  <span className="cat-emoji">😺</span>
                  {fact}
                </li>
              ))}
            </ul>
          ) : (
            <p>No se pudieron cargar los datos sobre gatos.</p>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn-primary" onClick={handleClose}>
            ¡Entendido!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatFactsModal;
