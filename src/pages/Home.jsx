import React from 'react';
import NavBar from '../components/organisms/NavBar';
import DeckoraSlider from '../components/organisms/DeckoraSlider';
import '../styles/pages/home.css';

function Home() {
  return (
    <div>
      <div className="home-container">
        <h1 className="profile-name">Somos Deckora</h1>
        <DeckoraSlider />
      </div>
    </div>
  );
}

export default Home;
