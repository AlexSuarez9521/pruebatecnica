import React, { useState, useEffect } from 'react';
import { externalApiService } from '../services/api';

/**
 * Footer con dato inútil del día e información de la empresa
 */
const UselessFactFooter = () => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUselessFact();
  }, []);

  const fetchUselessFact = async () => {
    try {
      setLoading(true);
      const factText = await externalApiService.getUselessFact();
      setFact(factText);
    } catch (err) {
      console.error('Error loading useless fact:', err);
      setFact('No se pudo cargar el dato del día.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="app-footer">
      {/* Useless Fact Section */}
      <div className="useless-fact-section">
        <h4>Dato Inútil del Día</h4>
        {loading ? (
          <p className="fact-loading">Cargando dato curioso...</p>
        ) : (
          <p className="fact-text">{fact}</p>
        )}
      </div>

      {/* Company Info Section */}
      <div className="company-footer">
        <div className="company-content">
          <div className="company-logo">
            <div className="logo-circle">
              <span className="logo-icon">🌐</span>
            </div>
            <div className="company-name">
              <h3>Comercial Card <span className="sas">S.A.S</span></h3>
              <p className="slogan">Integramos, Innovamos y Servimos</p>
              <p className="nit">NIT: 900.294.369-8</p>
            </div>
          </div>

          <div className="company-divider"></div>

          <div className="company-address">
            <p className="address-title">Torre Diners Club Medellín</p>
            <p>Calle 5A # 39-194 of 702</p>
          </div>

          <div className="company-divider"></div>

          <div className="company-contact">
            <p>Teléfono: <strong>(4) 605 09 62</strong></p>
            <p>
              <a href="mailto:info@comercialcard.com.co">info@comercialcard.com.co</a>
            </p>
          </div>

          <div className="company-divider"></div>

          <div className="company-web">
            <a href="https://www.ptm.com.co" target="_blank" rel="noopener noreferrer">
              www.ptm.com.co
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default UselessFactFooter;
