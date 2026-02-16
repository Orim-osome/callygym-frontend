import "../styles/trainers.css";
import trainer1 from "../assets/trainer1.png";
import trainer2 from "../assets/trainer2.png";

const trainers = [
  {
    name: "Coach Oruru",
    specialty: "HIIT & Strength",
    img: trainer1,
  },

  {
    name: "Coach Testimony",
    specialty: "Yoga & Mobility",
    img: trainer2,
  },
];

export default function Trainers() {
  return (
    <section className="trainers-page">
      <div className="container">
        <h1 className="section-title">Meet Our Trainers</h1>
        <div className="trainers-grid">
          {trainers.map((t) => (
            <div key={t.name} className="trainer-card">
              <img src={t.img} alt={t.name} />
              <h3>{t.name}</h3>
              <p>{t.specialty}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
