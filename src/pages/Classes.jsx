import "../styles/classes.css";
import PaymentForm from "../components/PaymentForm.jsx";

const schedule = [
  {
    day: "Monday",
    classes: [
      {
        name: "HIIT Blast",
        time: "6:00 AM - 7:00 AM",
        desc: "High-intensity interval training for fat burn and energy boost.",
      },
      {
        name: "Yoga Flow",
        time: "12:00 PM - 1:00 PM",
        desc: "Gentle flow for flexibility, balance, and relaxation.",
      },
      {
        name: "Zumba Party",
        time: "6:00 PM - 7:00 PM",
        desc: "Dance-based cardio fun with Latin rhythms.",
      },
      {
        name: "Strength Training",
        time: "8:00 PM - 9:00 PM",
        desc: "Weightlifting and bodyweight exercises for muscle gain.",
      },
    ],
  },
  {
    day: "Tuesday",
    classes: [
      {
        name: "Spin Cycle",
        time: "7:00 AM - 8:00 AM",
        desc: "Intense cycling for endurance and cardio.",
      },
      {
        name: "Boxing Basics",
        time: "5:00 PM - 6:00 PM",
        desc: "Learn punches, footwork, and self-defense.",
      },
      {
        name: "Pilates Core",
        time: "7:00 PM - 8:00 PM",
        desc: "Core strengthening and posture improvement.",
      },
    ],
  },
  {
    day: "Wednesday",
    classes: [
      {
        name: "Bootcamp",
        time: "6:00 AM - 7:00 AM",
        desc: "Military-style workout with circuits and teamwork.",
      },
      {
        name: "Dance Fitness",
        time: "6:00 PM - 7:00 PM",
        desc: "Fun choreography to popular music.",
      },
      {
        name: "Flexibility & Mobility",
        time: "8:00 PM - 9:00 PM",
        desc: "Stretching for recovery and injury prevention.",
      },
    ],
  },
  {
    day: "Thursday",
    classes: [
      {
        name: "Power Lifting",
        time: "7:00 AM - 8:00 AM",
        desc: "Focus on squats, deadlifts, and bench press.",
      },
      {
        name: "HIIT & Core",
        time: "5:00 PM - 6:00 PM",
        desc: "Quick bursts of intensity + ab sculpting.",
      },
      {
        name: "Yoga Sculpt",
        time: "7:00 PM - 8:00 PM",
        desc: "Yoga with light weights for toning.",
      },
    ],
  },
  {
    day: "Friday",
    classes: [
      {
        name: "Full Body Burn",
        time: "6:00 AM - 7:00 AM",
        desc: "Total-body workout to kick off the weekend.",
      },
      {
        name: "Aqua Fitness",
        time: "6:00 PM - 7:00 PM",
        desc: "Low-impact water-based cardio (pool available).",
      },
      {
        name: "Fun Friday Flow",
        time: "8:00 PM - 9:00 PM",
        desc: "Relaxed yoga + meditation to unwind.",
      },
    ],
  },
  {
    day: "Saturday",
    classes: [
      {
        name: "Weekend Warrior",
        time: "9:00 AM - 10:00 AM",
        desc: "High-energy group workout for all levels.",
      },
      {
        name: "Family Fitness",
        time: "11:00 AM - 12:00 PM",
        desc: "Fun classes for kids and adults.",
      },
    ],
  },
  {
    day: "Sunday",
    classes: [
      {
        name: "Restorative Yoga",
        time: "10:00 AM - 11:00 AM",
        desc: "Gentle session for recovery and mindfulness.",
      },
      {
        name: "Active Recovery",
        time: "4:00 PM - 5:00 PM",
        desc: "Light stretching and mobility work.",
      },
    ],
  },
];

export default function Classes() {
  return (
    <section className="classes-page">
      <div className="container">
        <h1 className="section-title">Our Classes</h1>
        <p className="classes-subtitle">
          Discover a variety of energizing classes for all levels – from
          beginners to advanced athletes. All classes are led by certified
          trainers.
        </p>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#FF6B00",
            margin: "2rem 0 1.5rem",
          }}
        >
          ₦500 - per class
        </h2>

        <div className="schedule-grid">
          {schedule.map((day) => (
            <div key={day.day} className="day-column">
              <h3 className="day-title">{day.day}</h3>
              {day.classes.map((cls) => (
                <div key={cls.name} className="class-item">
                  <div className="class-header">
                    <h4>{cls.name}</h4>
                    <span className="class-time">{cls.time}</span>
                  </div>
                  <p className="class-desc">{cls.desc}</p>
                  <PaymentForm
                    buttonText="Book Now"
                    amountNaira={500}
                    planName={cls.name}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
