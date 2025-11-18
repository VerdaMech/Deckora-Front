import React from 'react';
import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import NoticiasCardBody from '../molecules/NoticiasCardBody';
import { useNavigate } from 'react-router-dom';

function NoticiasCard({ item }) {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }} className="m-2">
      {item.image && <Image src={item.image} alt={item.name} className="card-img-top" />}
      <Card.Body>
        <NoticiasCardBody
          title={item.name}
          category={item.section}
        />
        <Button
          variant="primary"
          onClick={() => navigate(`/noticias/${item.id}`)}
          className="mb-2 d-block w-auto mx-auto"
        >
          Detalles
        </Button>
      </Card.Body>
    </Card>
  );
}


export default NoticiasCard;
