import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div>
          <a href="mailto:dr.fisher.endo@gmail.com">dr.fisher.endo@gmail.com</a>
        </div>
        <div>
          <a href="tel:0523254522">0523254522</a>
        </div>
        <div>
          <Link to="/accessibility">הצהרת נגישות</Link>
        </div>
        <div>
          <p>©2024 by Dr. Fisher Endo</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

