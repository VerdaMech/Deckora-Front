import React from 'react';
import Text from '../atoms/Text';

function NoticiasCardBody({ title, summary, category }) {

  return (
    <>
      <Text variant="h5">{title}</Text>
      <Text variant="p">{summary}</Text>
      
      {category && (
        <Text variant="span" className="text-muted">
          {category}
        </Text>
      )}
    </>
  );
}

export default NoticiasCardBody;
