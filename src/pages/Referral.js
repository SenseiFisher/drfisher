import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default marker icon in React-Leaflet
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function Referral() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    subject: '',
    content: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowThankYou(true);
    setFormData({
      name: '',
      address: '',
      email: '',
      phone: '',
      subject: '',
      content: ''
    });
    setTimeout(() => {
      setShowThankYou(false);
    }, 5000);
  };

  return (
    <section className="page-content referral-page">
      <h1 className="page-title">צור קשר</h1>
      
      <div className="content-section">
        <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">שם</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">כתובת</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">אימייל</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">מספר טלפון</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">נושא</label>
            <input 
              type="text" 
              id="subject" 
              name="subject" 
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">תוכן</label>
            <textarea 
              id="content" 
              name="content" 
              rows="6" 
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="submit-btn">שלח</button>
          
          {showThankYou && (
            <div className="thank-you-message">
              תודה
            </div>
          )}
        </form>
      </div>

      <div className="content-section">
        <div className="contact-info">
          <p>
            <strong>
              <a 
                href="https://waze.com/ul?ll=32.4750,34.9500&navigate=yes"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
                onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
              >
                פרדס חנה כרכור, דרך הים 34 א
              </a>
            </strong>
          </p>
          <div className="map-container">
            <MapContainer
              center={[32.4750, 34.9500]}
              zoom={15}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[32.4750, 34.9500]}>
                <Popup>
                  דר אליהו פישר<br />
                  פרדס חנה כרכור, דרך הים 34 א
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Referral;

