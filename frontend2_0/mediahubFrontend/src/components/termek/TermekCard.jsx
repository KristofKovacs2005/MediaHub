// Standardized TermekCard component
import React from 'react';

const TermekCard = ({ termek }) => (
  <div className="card termek-card mb-3" style={{ maxWidth: '18rem' }}>
    <img src={"http://localhost:3000" + termek.pictureUrl} alt={termek.name} className="card-img-top termek-image" />
    <div className="card-body">
      <h5 className="card-title">{termek.name}</h5>
      <p className="card-text">{termek.description}</p>
      {/* Add more fields as needed */}
    </div>
  </div>
);

export default TermekCard;
