import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { casesData } from '../data/casesData';

function CaseDetail() {
  const { caseId } = useParams();
  const caseData = casesData[caseId];

  if (!caseData) {
    return (
      <section className="page-content">
        <h1 className="page-title">מקרה לא נמצא</h1>
        <div className="content-section">
          <p>המקרה המבוקש לא נמצא.</p>
          <Link to="/cases" className="nav-button">← חזרה להצגת מקרים</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="page-content">
      <div className="nav-buttons">
        <Link to="/cases" className="nav-button">← חזרה להצגת מקרים</Link>
      </div>

      <h1 className="page-title">{caseData.title}</h1>
      
      <div className="content-section">
        <p>{caseData.description}</p>
      </div>

      <div className="case-detail">
        {caseData.cases.map((caseItem, index) => (
          <div key={index} className="case-section">
            <h3>{caseItem.title}</h3>
            <div className="case-images">
              {caseItem.images.map((image, imgIndex) => (
                <div key={imgIndex} className={`case-image-item ${!image.caption ? 'no-caption' : ''}`}>
                  {image.caption && <h4>{image.caption}</h4>}
                  <img src={image.src} alt={image.alt} />
                  {image.description && <p>{image.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="nav-buttons">
        <Link to="/cases" className="nav-button">← חזרה להצגת מקרים</Link>
      </div>
    </section>
  );
}

export default CaseDetail;

