import React from 'react';
import image1 from '../assets/images/equipment/image4_edited_edited.png';
import image2 from '../assets/images/equipment/equipment-image1.png';
import image3 from '../assets/images/equipment/image1_edited_edited.png';
import image5 from '../assets/images/equipment/equipment-rubber-dam.jpg';
import image6 from '../assets/images/equipment/image2_edited_edited.png';
import image7 from '../assets/images/equipment/image3_edited_edited.png';

const equipment = [
  {
    title: 'מד אורך אלקטרוני',
    description: 'השיטה המדויקת ביותר לקביעת סוף התעלה.<br />מכשיר שמודד את אורך התעלות בדיוק של עשירית מילימטר.<br />עוזר באיתור נקובים או ספיגות שורש.<br />מונע קרינת רנטגן במהלך קביעת אורך מדויקת של תעלות השורש.',
    image: image1
  },
  {
    title: 'שכר גומי',
    description: 'חשיבות השימוש ב סכר גומי הוא לצורך הגנה מפני<br />חדירת רוק וזיהום משני לשן המטופלת.<br />הגנה מפני בליעה או שאיפה של מכשירים ותכשירי<br />עבודה ושיפור הראייה- השן בולטת יותר ושדה הראיה<br />הוא טוב יותר.',
    image: image2
  },
  {
    title: 'מכשיר אולטראסוניק',
    description: 'מכשיר שיוצר רעידות על קוליות ומשמש למגוון<br />שימושים כמו:<br />ניקוי תעלות השורש בצורה יעילה יותר, אנטי בקטריאלי<br />והוצאת מכשירים שבורים ומבנים עקשנים מתעלות השורש.',
    image: image3
  },
  {
    title: 'מערכות הגדלה ותאורה',
    description: 'מערכות המאפשרות שיפור ראיית שדה העבודה ע"י הגדלה בתוספת תאורה עוצמתית ומאפשרת שליטה של הרופא על הפרטים הקטנים ושיפור איכות הטיפול באופן משמעותי.',
    image: null
  },
  {
    title: 'מכשור סבב לעבודה עם פוצרים מניקל-טיטניום',
    description: 'שימוש במכשור מתכתי רגיל עלול להוביל לניקוב וסדיקת<br />שורש השן.<br />סגסוגת ניקל-טיטניום היא מתכת גמישה וחזקה<br />שמסוגלת להתעקל ולהתפתל בתוך תעלת השורש ללא נזק לקירות השורש.<br />למכשיר הסבב יש שליטה על המהירות ועל עוצמת הפיתול של הפוצרים מה שמפחית את סיכויי שבירתם בתעלת השורש.',
    image: image5
  },
  {
    title: 'מכשיר לחימום ודחיסת סתימת השורש',
    description: 'המכשיר מרכך, ע"י חום, את סתימת השורש,<br />ומאפשר למילוי תלת מימדי של תעלות השורש כולל מילוי של תעלות צדדיות ואזורים אירגולריים בתעלת השורש.',
    image: image6
  },
  {
    title: 'מזרק ממוחשב',
    description: 'מזרק מבוקר מחשב , שולט בלחץ וקצב ההזרקה.<br />משפר את יעילות האלחוש ומפחית את הכאב<br />הכרוך במתן האלחוש.',
    image: image7
  },
  {
    title: 'צילום רנטגן דיגיטלי',
    description: 'צילומי רנטגן דיגיטליים מפחיתים את הקרינה למטופל בצורה משמעותית בהשוואה לצילומי הרנטגן המסורתי (עם פילים).<br />הם משפרים את היכולת של הרופא לראות פרטים קטנים ולבצע אבחנה וטיפול מדויק יותר.',
    image: null
  }
];

function Equipment() {
  return (
    <section className="page-content">
      <h1 className="page-title">מכשור מתקדם</h1>
      
      <div className="content-section">
        <div className="equipment-list">
            {equipment.map((item, index) => (
              <div key={index} className="equipment-item">
                <div className="equipment-image-container">
                  {item.image && (
                    <img src={item.image} alt={item.title} className="equipment-image" />
                  )}
                </div>
                <div className="equipment-content">
                  <h2 className="equipment-title">{item.title}</h2>
                  <p 
                    className="equipment-description"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Equipment;

