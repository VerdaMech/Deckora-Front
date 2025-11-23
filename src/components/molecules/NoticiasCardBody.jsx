import React from 'react';

const NoticiasCardBody = ({ title, description, category }) => {
  return (
    <div className="card-body">
      <h5>{title}</h5>

      {description && (
        <p>{description}</p>
      )}

      {category && (
        <span className="text-muted">{category}</span>
      )}
    </div>
  );
};

export default NoticiasCardBody;
