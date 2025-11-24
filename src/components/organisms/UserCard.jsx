import React from 'react';
import { Card } from 'react-bootstrap';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';

function UserCard({ user }) {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }} className="m-2">
      <Card.Body>
        <CardBody
          title={`${user.nombre} ${user.apellido}`}
          run={`RUN: ${user.run}`}
          phoneNumber={` ${user.numero_telefono}`}
        />

        <div className="text-center text-muted mb-2">
          <small>{user.correo}</small>
          <br />
          <small>{user.direccion}</small>
        </div>

      </Card.Body>
    </Card>
  );
}

export default UserCard;

