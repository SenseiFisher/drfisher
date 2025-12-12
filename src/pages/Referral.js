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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('https://formspree.io/f/xrbnrobb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          address: formData.address,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          content: formData.content
        })
      });

      if (response.ok) {
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
      } else {
        setErrorMessage('אירעה שגיאה בשליחת הטופס. אנא נסו שוב.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('אירעה שגיאה בשליחת הטופס. אנא נסו שוב.');
    } finally {
      setIsSubmitting(false);
    }
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
          
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'שולח...' : 'שלח'}
          </button>
          
          {errorMessage && (
            <div className="error-message" style={{ 
              marginTop: '15px', 
              padding: '15px', 
              backgroundColor: '#f8d7da', 
              color: '#721c24', 
              border: '1px solid #f5c6cb', 
              borderRadius: '5px', 
              textAlign: 'center' 
            }}>
              {errorMessage}
            </div>
          )}
          
          {showThankYou && (
            <div className="thank-you-message">
              תודה! הפנייתך התקבלה בהצלחה.
            </div>
          )}
        </form>
      </div>

      <div className="content-section">
        <div className="contact-info">
          <p>
            <strong>
              <a 
                href="https://www.waze.com/he/live-map/directions/il/%D7%9E%D7%97%D7%95%D7%96-%D7%97%D7%99%D7%A4%D7%94/%D7%A4%D7%A8%D7%93%D7%A1-%D7%97%D7%A0%D7%94-%D7%9B%D7%A8%D7%9B%D7%95%D7%A8/%D7%93%D7%A8%D7%9A-%D7%94%D7%99%D7%9D-34?navigate=yes&to=place.EitEZXJlY2ggSGFZYW0gMzQsIFBhcmRlcyBIYW5hLUthcmt1ciwgSXNyYWVsIjASLgoUChIJFQtDgmcOHRURJNF3MES-H8kQIioUChIJr9DZvV0OHRURWApTZGwLhP8"
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
              center={[32.4806944, 34.9721389]}
              zoom={16}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
              <Marker position={[32.4806944, 34.9721389]}>
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

