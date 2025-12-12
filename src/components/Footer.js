import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-contact-item">
            <span className="footer-icon">📧</span>
            <a href="mailto:dr.fisher.endo@gmail.com" className="footer-link">
              dr.fisher.endo@gmail.com
            </a>
          </div>
          <div className="footer-contact-item">
            <span className="footer-icon">📞</span>
            <a href="tel:0523254522" className="footer-link">
              052-325-4522
            </a>
          </div>
          <div className="footer-contact-item">
            <Link to="/accessibility" className="footer-link">
              הצהרת נגישות
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p className="footer-copyright">
            ©2024 by Dr. Fisher Endo
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

