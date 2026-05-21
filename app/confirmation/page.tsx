import TopbarD from '../../components/TopbarD';
import Sidebar from '../../components/Sidebar';

export default function ConfirmationPage() {
  return (
        <div className="app-layout" >
            <Sidebar />
        <div className='content-wrapper'>
        <TopbarD/>
      <div className="confirmation-container">
      <div className="status-icon-circle">✓</div>
      
      <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', textAlign: 'center' }}>
        Transfert Réussi !
      </h1>
      
      <p style={{ color: '#71767e', textAlign: 'center', maxWidth: '480px', fontSize: '14px', marginBottom: '40px', margin: 'auto' }}>
        Votre transfert a été traité avec succès. Les fonds seront disponibles sur le compte du bénéficiaire sous peu.
      </p>

      <div className="receipt-card">
        <div className="receipt-header">
          <span style={{ color: '#f3ba2f', fontSize: '12px', fontWeight: '800' }}>📜 REÇU OFFICIEL CASHFLOW</span>
          <span style={{ color: '#2ecc71', fontSize: '12px', background: 'rgba(46,204,113,0.1)', padding: '4px 12px', borderRadius: '4px' }}>Complété</span>
        </div>

        <div className="ref-box">
          <div>
            <label style={{ fontSize: '10px', color: '#444', display: 'block', marginBottom: '4px' }}>RÉFÉRENCE</label>
            <span style={{ fontSize: '13px', fontWeight: '600' }}>TRX-8829-4410-XAF</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <label style={{ fontSize: '10px', color: '#444', display: 'block', marginBottom: '4px' }}>DATE & HEURE</label>
            <span style={{ fontSize: '13px', fontWeight: '600' }}>24 Mai 2024, 14:32:10</span>
          </div>
        </div>

        <div className="info-row">
          <span className="info-label">Expéditeur</span>
          <div className="info-value">Alex Rivera <br/><small style={{ color: '#444' }}>**** 4410 (XAF)</small></div>
        </div>
        
        <div className="info-row">
          <span className="info-label">Bénéficiaire</span>
          <div className="info-value">Marie Dupont <br/><small style={{ color: '#444' }}>FR76 3000 6000 **** 1234 (EUR)</small></div>
        </div>
        
        <div className="info-row">
          <span className="info-label">Montant Envoyé</span>
          <span className="info-value">500 000 XAF</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Taux de Change</span>
          <span className="info-value">1 XAF = 0,00152 EUR</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Montant Reçu (Est.)</span>
          <span className="info-value">762,20 EUR</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">Frais de Service</span>
          <span className="info-value">2 500 XAF</span>
        </div>

        <div className="divider-dashed"></div>

        <div className="info-row" style={{ paddingBottom: '24px' }}>
          <span className="info-label" style={{ fontWeight: '700' }}>Total Débité</span>
          <span className="total-text">502 500 XAF</span>
        </div>

        <div className="action-grid" style={{ borderTop: '1px solid #232529' }}>
          <button className="btn-outline">🔗 Partager</button>
        </div>
      </div>

      <div className="footer-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
        <button className="btn-gold">🔄 Nouveau Transfert</button>
        <button className="btn-dark">📊 Tableau de Bord</button>
      </div>
    </div>
        <footer className="footer">
        <span>© 2025 Cashflow Inc. All rights reserved.</span>
        <div className="footer-links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Help Center</a>
        </div>
      </footer>
    </div>
    </div>
  );
}
