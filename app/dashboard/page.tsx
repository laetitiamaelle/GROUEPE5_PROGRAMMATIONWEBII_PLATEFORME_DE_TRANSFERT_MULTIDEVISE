import StatCard from '../../components/StatCard'; 
import UserTable from '../../components/UserTable';
import Sidebar from '../../components/Sidebar';
import TopbarD from '../../components/TopbarD' 


export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0B'}}>
    <Sidebar />
   

    <div className="dashboard-view">
      <TopbarD/>
      <section className="welcome">
        <h1>Administration des Utilisateurs</h1>
        <p>Surveillance globale de l'activité financière.</p>
      </section>
       
      <div className="stats-grid">
        <StatCard 
          label="Transactions Actives" 
          value="86" 
          subtext="En cours de traitement" 
        />
        <StatCard 
          label="Utilisateurs Totaux" 
          value="1,284" 
          trend="+12 nouveaux cette semaine" 
        />
        <StatCard 
          label="Volume 24h" 
          value="45,820,000 XAF" 
          subtext="Volume total des transferts" 
        />
        <StatCard 
          label="Réserve Plateforme" 
          value="248,500.00 EUR"  
          subtext="Liquidités totales" 
        />
      </div>
    <section className="table-section-wrapper" style={{ marginTop: '40px' }}>
    <UserTable />
      </section>
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
