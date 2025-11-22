import React from 'react';
import NavBar from '../components/organisms/NavBar';
import DeckoraSlider from '../components/organisms/DeckoraSlider';
import '../styles/pages/home.css';
import { Container } from 'react-bootstrap';

function Home() {
  return (
    <Container>
      <Container className="home-container">
        <h1 className="profile-name">Somos Deckora</h1>
        <DeckoraSlider />
      </Container>
    </Container>
  );
}

export default Home;
