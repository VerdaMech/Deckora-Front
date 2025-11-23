import React from 'react';
import { Card } from 'react-bootstrap';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';

function UserCard({ users }) {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }} className="m-2">
      <Card.Body>
        <CardBody
          title={`${users.nombre} ${users.apellido}`}
          run={`RUN: ${users.run}`}
          phoneNumber={`📞 ${users.numero_telefono}`}
        />

        <div className="text-center text-muted mb-2">
          <small>{users.correo}</small>
          <br />
          <small>{users.direccion}</small>
        </div>

        <Button
          variant="primary"
          onClick={() => navigate(`/admin/usuarios/${users.id}`)}
          className="d-block mx-auto"
        >
          Ver detalles
        </Button>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
