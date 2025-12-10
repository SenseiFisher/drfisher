import React from 'react';
import heroImage from '../assets/images/hero/hero-main.jpg';

function Home() {
  return (
    <section className="hero-section">
      <div className="hero-image">
        <img src={heroImage} alt="דר פישר - טיפולי שורש מקצועיים" />
      </div>
      <div className="hero-text">
        <h1>ברוכים הבאים</h1>
      </div>
    </section>
  );
}

export default Home;

