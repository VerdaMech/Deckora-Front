import CardBody from "../molecules/CardBody";
import Button from "../atoms/Button";
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function MenuCard({ adminHome }) {
  const navigate = useNavigate();

  return (
    <Card className="m-2 card-size">
      <Card.Body>
        <CardBody
          title={adminHome.title}
          description={adminHome.description}
        />

        <div className="d-flex justify-content-center gap-3 flex-wrap mt-3">
          <Button
            variant="primary"
            onClick={() => navigate('/admin/productos')}
          >
            editar productos
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate('/admin/usuarios')}
          >
            editar usuarios
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default MenuCard;