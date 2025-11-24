import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import noticias from '../data/accesorios';
import Text from '../components/atoms/Text';
import Button from '../components/atoms/Button';
import Image from '../components/atoms/Image';
import '../styles/pages/noticiasDetail.css';

function NoticiasDetail() {
  const { id } = useParams();
  const noticia = noticias.find((n) => n.id === parseInt(id));
  const navigate = useNavigate();

  if (!noticia) {
    return (
      <div className="news-detail-page">
        <Container>
          <h1>Noticia no encontrada</h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="news-detail-page">
      <Container>
        <Card className="news-detail-card">
          <Image
            src={noticia.image}
            alt={noticia.title}
            className="card-img-top"
          />

          <Card.Body className="news-detail-body">

            <Text variant="h2" className="news-detail-title">
              {noticia.name}
            </Text>

            {noticia.section && (
              <Text variant="span" className="news-detail-meta">
                {noticia.section}
              </Text>
            )}

            <Text variant="p" className="news-detail-text">
              {noticia.description}
            </Text>

            <Button
              variant="primary"
              onClick={() => navigate('/noticias')}
              className="mt-3 d-block w-auto mx-auto"
            >
              Volver a Accesorios
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default NoticiasDetail;
