import React from 'react';
import Text from '../atoms/Text';

function CardBody({ title, price, section }) {
  return (
    <>
      <Text variant="h5">{title}</Text>

      {section && (
        <Text variant="p" className="text-muted">
          {section}
        </Text>
      )}
      
          {price && (
        <Text variant="h4">${price}</Text>
      )}
    </>
  );
}

export default CardBody;
