import React, { useState } from 'react';

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
    <section className="page-content">
      <h1 className="page-title">צור קשר</h1>
      
      <div className="content-section">
        <div className="contact-info">
          <p><strong>פרדס חנה כרכור, דרך הים 34 א</strong></p>
          <p><a href="mailto:dr.fisher.endo@gmail.com">dr.fisher.endo@gmail.com</a></p>
          <p><a href="tel:0523254522">0523254522</a></p>
        </div>
      </div>

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
    </section>
  );
}

export default Referral;

