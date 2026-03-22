// Standardized TermekList component
import React from 'react';
import TermekCard from './TermekCard.jsx';

const TermekList = ({ termekek, maxPreview = 5, showAll, onShowAll }) => {
  const previewTermekek = termekek.slice(0, maxPreview);
  return (
    <div className="row termek-list">
      {previewTermekek.map(termek => (
        <div className="col-md-4 col-sm-6" key={termek.id}>
          <TermekCard termek={termek} />
        </div>
      ))}
      {termekek.length > maxPreview && !showAll && (
        <div className="col-12 text-center mt-3">
          <button className="btn btn-primary" onClick={onShowAll}>Show All</button>
        </div>
      )}
      {showAll && termekek.slice(maxPreview).map(termek => (
        <div className="col-md-4 col-sm-6" key={termek.id}>
          <TermekCard termek={termek} />
        </div>
      ))}
    </div>
  );
};

export default TermekList;
