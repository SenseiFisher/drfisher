import React from 'react';
import { Link } from 'react-router-dom';
import project1 from '../assets/images/projects/project1.jpg';
import project2 from '../assets/images/projects/project2.jpg';
import project3 from '../assets/images/projects/project3.jpg';
import project4 from '../assets/images/projects/project4.jpg';
import project5 from '../assets/images/projects/project5.jpg';
import project6 from '../assets/images/projects/project6.jpg';
import project7 from '../assets/images/projects/project7.jpg';
import project8 from '../assets/images/projects/project8.jpg';

const projects = [
  {
    id: 'itum-nekev',
    title: 'איטום נקב',
    description: 'ניקוב הוא חור בדופן השן שיכול להיווצר בטעות ע"י רופא השיניים. קיימת חשיבות לטפל במקרים אלו בהקדם, היות שדרכם עלולים לחדור חיידקים וליצור דלקת. במקרים אלו יש להעריך האם ניתן לטפל ומה סיכויי ההצלחה, ובהתאם לכך לאטום את אותם נקבים עם חומר יעודי וכך להציל את השן.',
    image: project1
  },
  {
    id: 'guta-perka',
    title: 'גוטה פרקה שהוצאה מעבר לאפקס',
    description: 'סתימת שורש מורכבת מחומר משכתי וחומר מוצק שנקרא גוטה פרקה. במהלך סתימת השורש, הגוטה פרקה עלולה לחדור מעבר לקצה השורש. במצב שבו נדרש לבצע חידוש טיפול שורש בשן, והגוטה פרקה חדרה מעבר לקצה השורש, רצוי להוציאה. במקרים אלו יש חשיבות לטכניקה ועדינות הטיפול.',
    image: project2
  },
  {
    id: 'havharat-shinayim',
    title: 'הבהרת שיניים פנימית',
    description: 'שן ששנתה את צבעה בגלל תהליכים שקורים בתוך השן, ניתנת להבהרה ע"י תהליך שנקרא הבהרה פנימית. יש לקחת בחשבון, שלא תמיד ניתן להחזיר את השן לגוון המקורי ועם הזמן עלולה לחול נסיגה בצבע שהושג.',
    image: project3
  },
  {
    id: 'hotzaat-machshir-shavor',
    title: 'הוצאת מכשיר שבור מהתעלה',
    description: 'במהלך טיפול שורש עלול להישבר מכשיר בתעלת השורש. המכשיר השבור יכול לחסום את החדירה לכל אורך התעלה, ובכך למנוע אפשרות של ניקוי נאות של התעלה, ובעקבות כך, התפתחות של דלקת או אי ריפוי של דלקת קיימת. במקרים אלו יש להעריך האם ניתן להוציא או לעקוף את המכשיר השבור, כדי לאפשר ניקוי ואיטום של כל התעלה. במקרים מסוימים ידרש רק מעקב.',
    image: project4
  },
  {
    id: 'tipul-shorash-kifuf',
    title: 'טיפול שורש בשן עם כיפוף חריג',
    description: 'במקרים בהם שורש השן מאוד מכופף, טיפול השורש דורש תכנון מקדים, מכשור מתאים, וטכניקת טיפול מתאימה.',
    image: project5
  },
  {
    id: 'refui-negaim',
    title: 'ריפוי של נגעים סב-שורשיים',
    description: 'בצילום רנטגן ניתן לראות נגע סב-שורשי ע"י אזורים של חוסר עצם סביב השורש. לאחר טיפול שורש, זמן הריפוי והמילוי עם עצם, של אותם חללים, יכול לקחת מספר חודשים עד כשנתיים ולעיתים אף יותר מכך, ולכן במקרים אלו, יש חשיבות לבצע מעקבים.',
    image: project6
  },
  {
    id: 'tipul-shorash-shein-lo-siyema',
    title: 'טיפול שורש בשן שלא סיימה את התפתחותה',
    description: 'בשן קבועה צעירה שלא סיימה את התפתחותה, השורשים עדיין לא מפותחים מספיק ולכן הם קצרים יותר, עם קירות דקים ותעלות רחבות שמסתיימות עם פתח רחב. לפני טיפול בשיניים אלו יש חשיבות לאבחנה של מצב הרקמה הפנימית, היות שאם הרקמה תקינה, ניתן למנוע טיפול שורש ולתת לשן להמשיך להתפתח. במצבים בהם הרקמה הפנימית של השן אינה תקינה, מבצעים טיפול שורש. טיפולי השורש בשיניים אלו מבוצעים בשיטות שונות, תלוי בשלב ההתפתחות שבו השורשים נמצאים.',
    image: project7
  },
  {
    id: 'tipul-shorash-morphologia',
    title: 'טיפול שורש בשן עם מורפולוגיה חריגה',
    description: 'במקרים בהם לשן יש צורה חריגה, נדרש שימוש בציוד ומכשור מיוחדים, וזאת לאחר תכנון הטיפול בעזרת צילומים תלת-ממדיים (CBCT) שנותנים מידע מדויק על האנטומיה של השן.',
    image: project8
  }
];

function Cases() {
  return (
    <section className="page-content">
      <h1 className="page-title">הצגת מקרים</h1>
      
      <div className="projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <Link to={`/cases/${project.id}`}>
              <img 
                src={project.image} 
                alt={project.title} 
                style={{ width: '100%', height: '250px', objectFit: 'cover', marginBottom: '15px' }}
              />
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <span className="project-link">להצגת מקרים →</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Cases;

