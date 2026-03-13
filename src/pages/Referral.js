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
    patientName: '',
    toothNumber: '',
    reasonConsultation: false,
    reasonRootCanal: false,
    reasonRetreatment: false,
    reasonOther: '',
    treatmentPerformed: '',
    doctorName: '',
    doctorPhone: '',
    doctorEmail: '',
    referralDate: ''
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    patientName: '',
    toothNumber: '',
    treatmentPerformed: '',
    doctorName: '',
    doctorPhone: '',
    doctorEmail: '',
    referralDate: ''
  });
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [hoveredAttachmentIdx, setHoveredAttachmentIdx] = useState(null);
  const referralFormPdfUrl = '/pdfs/referral-form.pdf';
  const primaryButtonStyle = {
    backgroundColor: '#00897b',
    borderRadius: '999px',
    padding: '10px 28px',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

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
      doctorPhone: formatted
    });
    
    // Clear error when user starts typing
    if (fieldErrors.doctorPhone) {
      setFieldErrors({
        ...fieldErrors,
        doctorPhone: ''
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
      doctorEmail: value
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
        patientName: 'שם המטופל/ת',
        toothNumber: 'מספר שן',
        treatmentPerformed: 'טיפול שבוצע',
        doctorName: 'שם הרופא/ה',
        doctorPhone: 'מספר טלפון',
        doctorEmail: 'דוא"ל',
        referralDate: 'תאריך ההפניה'
      };
      return `שדה ${fieldNames[name]} נדרש`;
    }
    
    return '';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'doctorPhone') {
      handlePhoneChange(e);
    } else if (name === 'doctorEmail') {
      handleEmailChange(e);
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
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
      patientName: validateField('patientName', formData.patientName),
      // toothNumber: validateField('toothNumber', formData.toothNumber), // optional, uncomment if required
      treatmentPerformed: validateField('treatmentPerformed', formData.treatmentPerformed),
      doctorName: validateField('doctorName', formData.doctorName),
      doctorPhone: validateField('doctorPhone', formData.doctorPhone),
      doctorEmail: validateField('doctorEmail', formData.doctorEmail),
      referralDate: validateField('referralDate', formData.referralDate)
    };

    // Ensure at least one reason is selected
    const hasReasonSelected =
      formData.reasonConsultation ||
      formData.reasonRootCanal ||
      formData.reasonRetreatment ||
      formData.reasonOther.trim() !== '';
    
    // Validate email
    const emailValidation = validateEmail(formData.doctorEmail);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error);
      setErrorMessage('אנא מלא את כל השדות הנדרשים');
      setIsSubmitting(false);
      // Scroll to email field
      setTimeout(() => {
        const emailField = document.getElementById('doctorEmail');
        if (emailField) {
          emailField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          emailField.focus();
        }
      }, 100);
      return;
    }
    
    if (!hasReasonSelected) {
      setErrorMessage('אנא בחר/י לפחות סיבת הפניה אחת');
      setIsSubmitting(false);
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
        const fieldOrder = ['patientName', 'toothNumber', 'treatmentPerformed', 'doctorName', 'doctorPhone', 'doctorEmail', 'referralDate'];
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
      const data = {
          patientName: formData.patientName,
          toothNumber: formData.toothNumber,
          reasonConsultation: formData.reasonConsultation,
          reasonRootCanal: formData.reasonRootCanal,
          reasonRetreatment: formData.reasonRetreatment,
          reasonOther: formData.reasonOther,
          treatmentPerformed: formData.treatmentPerformed,
          doctorName: formData.doctorName,
          doctorPhone: formData.doctorPhone,
          doctorEmail: formData.doctorEmail,
          referralDate: formData.referralDate
        };
      const bodyData = new FormData();
      Object.keys(data).forEach(key => {
        bodyData.append(key, data[key]);
      });
      bodyData.append('accessKey', 'sf_fhcf6j31k00i6l0mg72blah2');
      if (attachedFiles.length > 0) {
        attachedFiles.forEach((file) => {
          bodyData.append('file', file);
        });
      }
      const response = await fetch('https://api.staticforms.dev/submit', {
        method: 'POST',
        body: bodyData
      });

      if (response.ok) {
        setShowThankYou(true);
        setFormData({
          patientName: '',
          toothNumber: '',
          reasonConsultation: false,
          reasonRootCanal: false,
          reasonRetreatment: false,
          reasonOther: '',
          treatmentPerformed: '',
          doctorName: '',
          doctorPhone: '',
          doctorEmail: '',
          referralDate: ''
        });
        setFieldErrors({
          patientName: '',
          toothNumber: '',
          treatmentPerformed: '',
          doctorName: '',
          doctorPhone: '',
          doctorEmail: '',
          referralDate: ''
        });
        setEmailError('');
        setAttachedFiles([]);
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

  const handleAttachmentsChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setAttachedFiles((prev) => [...prev, ...files]);
    // Allow selecting the same file again later
    e.target.value = '';
  };

  const handleRemoveAttachment = (index) => {
    const file = attachedFiles[index];
    if (!file) return;

    const ok = window.confirm(`להסיר את הקובץ "${file.name}"?`);
    if (!ok) return;

    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="page-content referral-page" dir="rtl">
      <h1 className="page-title">טופס הפניה</h1>
      <div className="content-section">
        <form
          id="contactForm"
          className="contact-form"
          onSubmit={handleSubmit}
          noValidate
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
            border: '1px solid #e0f2f1'
          }}
        >
          <div aria-live="polite" aria-atomic="true" className="sr-only"></div>

          {/* Section 1: Patient Details */}
          <div className="form-section" style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: '1.1rem',
                marginBottom: '12px',
                color: '#00695c',
                borderBottom: '2px solid #e0f2f1',
                paddingBottom: '4px'
              }}
            >
              פרטי המטופל/ת
            </h2>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div className="form-group" style={{ flex: 1, minWidth: '220px' }}>
                <label htmlFor="patientName">שם המטופל/ת</label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                  aria-invalid={!!fieldErrors.patientName}
                  aria-describedby={fieldErrors.patientName ? 'patientName-error' : undefined}
                  style={{ borderRadius: '8px' }}
                />
                {fieldErrors.patientName && (
                  <div
                    id="patientName-error"
                    role="alert"
                    style={{
                      color: '#721c24',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem'
                    }}
                  >
                    {fieldErrors.patientName}
                  </div>
                )}
              </div>

              <div className="form-group" style={{ width: '150px' }}>
                <label htmlFor="toothNumber">מספר שן</label>
                <input
                  type="text"
                  id="toothNumber"
                  name="toothNumber"
                  value={formData.toothNumber}
                  onChange={handleChange}
                  aria-invalid={!!fieldErrors.toothNumber}
                  aria-describedby={fieldErrors.toothNumber ? 'toothNumber-error' : undefined}
                  style={{ borderRadius: '8px' }}
                />
                {fieldErrors.toothNumber && (
                  <div
                    id="toothNumber-error"
                    role="alert"
                    style={{
                      color: '#721c24',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem'
                    }}
                  >
                    {fieldErrors.toothNumber}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Reason for Referral */}
          <div className="form-section" style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: '1.1rem',
                marginBottom: '12px',
                color: '#00695c',
                borderBottom: '2px solid #e0f2f1',
                paddingBottom: '4px'
              }}
            >
              סיבת הפניה
            </h2>

            <div
              className="checkbox-group"
              style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '12px'
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="checkbox"
                  name="reasonConsultation"
                  checked={formData.reasonConsultation}
                  onChange={handleChange}
                />
                ייעוץ
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="checkbox"
                  name="reasonRootCanal"
                  checked={formData.reasonRootCanal}
                  onChange={handleChange}
                />
                טיפול שורש
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input
                  type="checkbox"
                  name="reasonRetreatment"
                  checked={formData.reasonRetreatment}
                  onChange={handleChange}
                />
                חידוש טיפול שורש
              </label>
            </div>

            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label htmlFor="reasonOther">אחר (נא פרט/י)</label>
              <input
                type="text"
                id="reasonOther"
                name="reasonOther"
                value={formData.reasonOther}
                onChange={handleChange}
                style={{ borderRadius: '8px' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="treatmentPerformed">טיפול שבוצע</label>
              <textarea
                id="treatmentPerformed"
                name="treatmentPerformed"
                rows="1"
                value={formData.treatmentPerformed}
                onChange={handleChange}
                required
                aria-invalid={!!fieldErrors.treatmentPerformed}
                aria-describedby={fieldErrors.treatmentPerformed ? 'treatmentPerformed-error' : undefined}
                style={{ borderRadius: '8px', minHeight: '70px', resize: 'vertical' }}
              />
              {fieldErrors.treatmentPerformed && (
                <div
                  id="treatmentPerformed-error"
                  role="alert"
                  style={{
                    color: '#721c24',
                    fontSize: '0.875rem',
                    marginTop: '0.25rem'
                  }}
                >
                  {fieldErrors.treatmentPerformed}
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Referring Doctor Details */}
          <div className="form-section" style={{ marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: '1.1rem',
                marginBottom: '12px',
                color: '#00695c',
                borderBottom: '2px solid #e0f2f1',
                paddingBottom: '4px'
              }}
            >
              פרטי הרופא/ה המפנה
            </h2>

            <div
              style={{
                borderRadius: '12px',
                border: '1px solid #e0f2f1',
                backgroundColor: '#f9fbfb',
                padding: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '16px'
              }}
            >
              <div className="form-group">
                <label htmlFor="doctorName">שם הרופא/ה</label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  value={formData.doctorName}
                  onChange={handleChange}
                  required
                  aria-invalid={!!fieldErrors.doctorName}
                  aria-describedby={fieldErrors.doctorName ? 'doctorName-error' : undefined}
                  style={{ borderRadius: '8px' }}
                />
                {fieldErrors.doctorName && (
                  <div
                    id="doctorName-error"
                    role="alert"
                    style={{
                      color: '#721c24',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem'
                    }}
                  >
                    {fieldErrors.doctorName}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="doctorPhone">מספר טלפון</label>
                <input
                  type="tel"
                  id="doctorPhone"
                  name="doctorPhone"
                  value={formData.doctorPhone}
                  onChange={handleChange}
                  required
                  aria-invalid={!!fieldErrors.doctorPhone}
                  aria-describedby={fieldErrors.doctorPhone ? 'doctorPhone-error' : undefined}
                  style={{ borderRadius: '8px' }}
                />
                {fieldErrors.doctorPhone && (
                  <div
                    id="doctorPhone-error"
                    role="alert"
                    style={{
                      color: '#721c24',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem'
                    }}
                  >
                    {fieldErrors.doctorPhone}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="doctorEmail">דוא"ל</label>
                <input
                  type="email"
                  id="doctorEmail"
                  name="doctorEmail"
                  value={formData.doctorEmail}
                  onChange={handleChange}
                  required
                  aria-invalid={!!emailError}
                  aria-describedby={emailError ? 'doctorEmail-error' : undefined}
                  style={{ borderRadius: '8px' }}
                />
                {emailError && (
                  <div
                    id="doctorEmail-error"
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
                <label htmlFor="referralDate">תאריך הפניה</label>
                <input
                  type="date"
                  id="referralDate"
                  name="referralDate"
                  value={formData.referralDate}
                  onChange={handleChange}
                  required
                  aria-invalid={!!fieldErrors.referralDate}
                  aria-describedby={fieldErrors.referralDate ? 'referralDate-error' : undefined}
                  lang="he-IL"
                  style={{ borderRadius: '8px' }}
                />
                {fieldErrors.referralDate && (
                  <div
                    id="referralDate-error"
                    role="alert"
                    style={{
                      color: '#721c24',
                      fontSize: '0.875rem',
                      marginTop: '0.25rem'
                    }}
                  >
                    {fieldErrors.referralDate}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div
            className="form-actions"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              alignItems: 'flex-start'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label
                htmlFor="attachments"
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: '1px solid #00897b',
                  color: '#00897b',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  fontSize: '0.9rem'
                }}
              >
                צרף צילומים
              </label>
              <input
                id="attachments"
                type="file"
                multiple
                onChange={handleAttachmentsChange}
                style={{ display: 'none' }}
              />
            </div>

            {attachedFiles.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {attachedFiles.map((file, idx) => (
                  <button
                    key={`${file.name}-${file.size}-${file.lastModified}-${idx}`}
                    type="button"
                    onClick={() => handleRemoveAttachment(idx)}
                    onMouseEnter={() => setHoveredAttachmentIdx(idx)}
                    onMouseLeave={() => setHoveredAttachmentIdx(null)}
                    style={{
                      borderRadius: '999px',
                      border: hoveredAttachmentIdx === idx ? '1px solid #f5c6cb' : '1px solid #e0f2f1',
                      backgroundColor: hoveredAttachmentIdx === idx ? '#f8d7da' : '#f9fbfb',
                      color: hoveredAttachmentIdx === idx ? '#721c24' : '#00695c',
                      cursor: 'pointer',
                      padding: '6px 10px',
                      fontSize: '0.85rem',
                      maxWidth: '100%',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap'
                    }}
                    title="לחץ להסרה"
                  >
                    {file.name}
                    {hoveredAttachmentIdx === idx && (
                      <span style={{ marginInlineStart: '8px', fontSize: '0.8em' }}>
                        לחץ להסרה
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                style={primaryButtonStyle}
              >
                {isSubmitting ? 'שולח...' : 'שלח טופס'}
              </button>
              <a
                href={referralFormPdfUrl}
                className="submit-btn"
                style={{
                  ...primaryButtonStyle,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  width: 'auto',
                  maxWidth: 'none'
                }}
                target="_blank"
                rel="noreferrer"
              >
                הורדת טופס הפניה
              </a>
            </div>
          </div>

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
              תודה! הטופס נשלח בהצלחה.
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

