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
  const [emailError, setEmailError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    address: '',
    phone: '',
    subject: '',
    content: ''
  });

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters
    let cleaned = value.replace(/\D/g, '');
    
    // Limit to 10 digits maximum
    cleaned = cleaned.substring(0, 10);
    
    // Always format as 0XX-XXX-XXXX
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.substring(0, 3)}-${cleaned.substring(3)}`;
    return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 6)}-${cleaned.substring(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow digits, remove everything else
    let cleaned = value.replace(/\D/g, '');
    
    // Limit to 10 digits
    cleaned = cleaned.substring(0, 10);
    
    // Format with dashes
    const formatted = formatPhoneNumber(cleaned);
    
    setFormData({
      ...formData,
      phone: formatted
    });
    
    // Clear error when user starts typing
    if (fieldErrors.phone) {
      setFieldErrors({
        ...fieldErrors,
        phone: ''
      });
    }
    // Clear general error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateEmail = (email) => {
    // Empty is not allowed (email is required)
    if (email.trim().length === 0) {
      return { isValid: false, error: 'אימייל נדרש' };
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'אימייל לא תקין' };
    }
    
    return { isValid: true, error: '' };
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    
    setFormData({
      ...formData,
      email: value
    });
    
    // Validate email
    const validation = validateEmail(value);
    setEmailError(validation.error);
    
    // Clear general error message when user starts typing
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateField = (name, value) => {
    const trimmedValue = value.trim();
    
    if (trimmedValue.length === 0) {
      const fieldNames = {
        name: 'שם',
        address: 'כתובת',
        phone: 'מספר טלפון',
        subject: 'נושא',
        content: 'תוכן'
      };
      return `שדה ${fieldNames[name]} נדרש`;
    }
    
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      handlePhoneChange(e);
    } else if (name === 'email') {
      handleEmailChange(e);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      
      // Clear error when user starts typing
      if (fieldErrors[name]) {
        setFieldErrors({
          ...fieldErrors,
          [name]: ''
        });
      }
      // Clear general error message when user starts typing
      if (errorMessage) {
        setErrorMessage('');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    // Validate all required fields
    const errors = {
      name: validateField('name', formData.name),
      address: validateField('address', formData.address),
      phone: validateField('phone', formData.phone),
      subject: validateField('subject', formData.subject),
      content: validateField('content', formData.content)
    };
    
    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error);
      setErrorMessage('אנא מלא את כל השדות הנדרשים');
      setIsSubmitting(false);
      // Scroll to email field
      setTimeout(() => {
        const emailField = document.getElementById('email');
        if (emailField) {
          emailField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          emailField.focus();
        }
      }, 100);
      return;
    }
    
    // Check if there are any field errors
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      setFieldErrors(errors);
      setErrorMessage('אנא מלא את כל השדות הנדרשים');
      setIsSubmitting(false);
      
      // Scroll to first field with error
      setTimeout(() => {
        const fieldOrder = ['name', 'address', 'phone', 'subject', 'content'];
        for (const fieldName of fieldOrder) {
          if (errors[fieldName]) {
            const fieldElement = document.getElementById(fieldName);
            if (fieldElement) {
              fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              fieldElement.focus();
              break;
            }
          }
        }
      }, 100);
      return;
    }
    
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
        setFieldErrors({
          name: '',
          address: '',
          phone: '',
          subject: '',
          content: ''
        });
        setEmailError('');
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
        <form id="contactForm" className="contact-form" onSubmit={handleSubmit} noValidate>
          <div aria-live="polite" aria-atomic="true" className="sr-only"></div>
          <div className="form-group">
            <label htmlFor="name">שם</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? 'name-error' : undefined}
            />
            {fieldErrors.name && (
              <div 
                id="name-error"
                role="alert"
                style={{ 
                  color: '#721c24', 
                  fontSize: '0.875rem', 
                  marginTop: '0.25rem' 
                }}
              >
                {fieldErrors.name}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="address">כתובת</label>
            <input 
              type="text" 
              id="address" 
              name="address" 
              value={formData.address}
              onChange={handleChange}
              required
              aria-invalid={!!fieldErrors.address}
              aria-describedby={fieldErrors.address ? 'address-error' : undefined}
            />
            {fieldErrors.address && (
              <div 
                id="address-error"
                role="alert"
                style={{ 
                  color: '#721c24', 
                  fontSize: '0.875rem', 
                  marginTop: '0.25rem' 
                }}
              >
                {fieldErrors.address}
              </div>
            )}
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
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'email-error' : undefined}
            />
            {emailError && (
              <div 
                id="email-error"
                role="alert"
                style={{ 
                  color: '#721c24', 
                  fontSize: '0.875rem', 
                  marginTop: '0.25rem' 
                }}
              >
                {emailError}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">מספר טלפון</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              required
              aria-invalid={!!fieldErrors.phone}
              aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
            />
            {fieldErrors.phone && (
              <div 
                id="phone-error"
                role="alert"
                style={{ 
                  color: '#721c24', 
                  fontSize: '0.875rem', 
                  marginTop: '0.25rem' 
                }}
              >
                {fieldErrors.phone}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="subject">נושא</label>
            <input 
              type="text" 
              id="subject" 
              name="subject" 
              value={formData.subject}
              onChange={handleChange}
              required
              aria-invalid={!!fieldErrors.subject}
              aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
            />
            {fieldErrors.subject && (
              <div 
                id="subject-error"
                role="alert"
                style={{ 
                  color: '#721c24', 
                  fontSize: '0.875rem', 
                  marginTop: '0.25rem' 
                }}
              >
                {fieldErrors.subject}
              </div>
            )}
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
              aria-invalid={!!fieldErrors.content}
              aria-describedby={fieldErrors.content ? 'content-error' : undefined}
            />
            {fieldErrors.content && (
              <div 
                id="content-error"
                role="alert"
                style={{ 
                  color: '#721c24', 
                  fontSize: '0.875rem', 
                  marginTop: '0.25rem' 
                }}
              >
                {fieldErrors.content}
              </div>
            )}
          </div>
          
          <button type="submit" className="submit-btn" disabled={isSubmitting} aria-busy={isSubmitting}>
            {isSubmitting ? 'שולח...' : 'שלח'}
          </button>
          
          {errorMessage && (
            <div 
              className="error-message"
              role="alert"
              aria-live="assertive"
              style={{ 
                marginTop: '15px', 
                padding: '15px', 
                backgroundColor: '#f8d7da', 
                color: '#721c24', 
                border: '1px solid #f5c6cb', 
                borderRadius: '5px', 
                textAlign: 'center' 
              }}
            >
              {errorMessage}
            </div>
          )}
          
          {showThankYou && (
            <div 
              className="thank-you-message"
              role="status"
              aria-live="polite"
            >
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
              center={[32.4807500, 34.9725278]}
              zoom={18}
              maxZoom={18}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Source: Esri, Maxar, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
              <Marker position={[32.4807500, 34.9725278]}>
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

