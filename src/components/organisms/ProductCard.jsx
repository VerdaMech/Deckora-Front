import React from 'react';
import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';


function ProductCard({ product }) {
 const navigate = useNavigate();


 return (
   <Card style={{ width: '18rem' }} className="m-2">
     <Image src={product.image} alt={product.name} className="card-img-top" />
     <Card.Body>
       <CardBody
         title={product.name}
       />
       <Button variant="primary" onClick={() => navigate(`/proyectos/${product.id}`)}
        className="mb-2 d-block w-auto mx-auto">
          Ver detalles
       </Button>
     </Card.Body>
   </Card>
 );
}


export default ProductCard;
