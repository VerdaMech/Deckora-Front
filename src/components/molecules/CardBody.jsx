import React from 'react';
import Text from '../atoms/Text';


function CardBody({ title, description, link, date, fullDescription, phoneNumber, run }) {
 return (
   <>
     <Text variant="h4">{title}</Text>
     <Text variant="p">{description}</Text>
     <Text variant="p">{link}</Text>
     <Text variant="p">{date}</Text>
     <Text variant="p">{fullDescription}</Text>
     <Text variant="p">{phoneNumber}</Text>
     <Text variant="p">{run}</Text>
     
   </>
 );
}


export default CardBody;