import React, { useState, useEffect } from 'react';
import { externalApiService } from '../services/api';

const CatFactsModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [catFacts, setCatFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCatFacts();
  }, []);

  const fetchCatFacts = async () => {
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

  const handleClose = () => {
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
