import React from 'react';
import profileImage from '../assets/images/about/about-profile.png';

function About() {
  return (
    <section className="page-content">
      <h1 className="page-title">אודות</h1>
      
      <div className="content-section">
        <div className="about-profile">
          <div className="profile-image">
            <img src={profileImage} alt="Dr Eliahu Fisher Profile" />
          </div>
          <div className="profile-content">
            <h2>ד"ר אליהו פישר</h2>
            <p className="profile-title">רופא שיניים<br />מ.ר. 5143</p>
            
            <div className="credentials">
              <p><strong>CBTC בוגר קורס פענוח וביצוע</strong><br />אוניברסיטת תל-אביב</p>
              
              <p><strong>כיהן כחבר בוועד האיגוד הישראלי לאנדודונטיה</strong><br />2006 - 2011</p>
              
              <p><strong>חבר באיגוד הישראלי לאנדודונטיה</strong><br />משנת 1990</p>
              
              <p><strong>(ESE) חבר האיגוד האירופאי לאנדודונטולוגיה</strong></p>
              
              <p><strong>חבר בהסתדרות לרפואת שיניים בישראל</strong></p>
              
              <p><strong>תעודת "רופא שיניים מעודכן" של הסתדרות לרפואת שיניים בישראל</strong></p>
              
              <p><strong>D.M.D רופא שיניים כללי בעל תואר</strong><br />משנת 1988</p>
              
              <p><strong>פרקטיקה בלעדית בטיפולי שורש</strong><br />משנת 1990</p>
              
              <p><strong>השתלם במחלקה לשיקום הפה</strong><br />1988 - 1989 אוניברסיטת תל-אביב</p>
              
              <p><strong>שירת במסגרת צה"ל במחלקה לאנדודונטיה</strong><br />2012 - 1993 שיב"א תל השומר</p>
              
              <p><strong>טיפל בחבלות דנטליות</strong><br />2018 - 2015 במסגרת הסדר של משרד החינוך</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

