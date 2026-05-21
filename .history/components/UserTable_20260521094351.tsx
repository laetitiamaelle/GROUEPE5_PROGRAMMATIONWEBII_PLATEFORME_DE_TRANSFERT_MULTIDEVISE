import React from 'react';

const users = [
  { id: 1, name: "Jean Dupont", email: "jean.dupont@email.com", currency: "EUR", balance: "2 540,50 €", status: "Actif" },
  { id: 2, name: "Marie Ngo", email: "marie.ngo@outlook.fr", currency: "XAF", balance: "1 250 000 FCFA", status: "Actif" },
  { id: 3, name: "Alice Walker", email: "a.walker@finance.com", currency: "USD", balance: "8 400,00 $US", status: "Vérification" },
  { id: 4, name: "Paul Atangana", email: "paulata@gmail.com", currency: "XAF", balance: "45 000 FCFA", status: "Suspendu" },
  { id: 5, name: "Sophie Martin", email: "s.martin@service.com", currency: "EUR", balance: "120,75 €", status: "Actif" },
];

export default function UserTable() {
  return (
    <div className="user-table-container">
      <div className="table-header-row">
        <div className="table-title-area">
          <h2>Répertoire des Utilisateurs</h2>
          <p>Gérez les accès et surveillez les soldes individuels.</p>
        </div>
        <div className="table-controls">
          <div className="inner-search">
            <span>🔍</span>
            <input type="text" placeholder="Rechercher un utilisateur..." />
          </div>
          <button className="filter-btn-table">
             <span>▽</span> Filtres
          </button>
        </div>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Utilisateur</th>
            <th>Devise du Compte</th>
            <th>Solde Actuel</th>
            <th>Statut</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <div className="user-info-cell">
                  <div className="user-avatar-circle">
                    {u.name.charAt(0)}
                  </div>
                  <div className="user-text-meta">
                    <span className="user-full-name">{u.name}</span>
                     <span className="user-email-addr">{u.email}</span>
                  </div>
                </div>
              </td>
              <td className="currency-cell">{u.currency}</td>
              <td className="user-email-addr">{u.balance}

              </td>
               
              <td>
                <span className={`status-pill ${u.status.toLowerCase().replace('é', 'e')}`}>
                  {u.status}
                </span>
              </td>
              <td className="actions-cell-icons">
                <button title="Voir">👁️</button>
                <button title="Ajouter">👤+</button>
                <button title="Plus">•••</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
