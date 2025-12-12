import React, { useEffect } from 'react';
import heroImage from '../assets/images/hero/hero-main.jpg';

function Home() {
  useEffect(() => {
    const body = document.body;
    const main = document.getElementById('main-content');
    if (body && main) {
      body.classList.add('home-page-active');
      main.classList.add('home-page');
    }
    return () => {
      if (body && main) {
        body.classList.remove('home-page-active');
        main.classList.remove('home-page');
      }
    };
  }, []);

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

