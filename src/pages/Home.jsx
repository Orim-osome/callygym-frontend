import "../styles/Home.css";
import "../styles/features.css";
import "../styles/testimonials.css";
import { useEffect, useRef, useState } from "react";
import FreeTrialForm from "../components/FreeTrialForm.jsx";

export default function Home() {
  const videoRef = useRef(null);
  const sourceRef = useRef(null);
  const [showTrialForm, setShowTrialForm] = useState(false);

  useEffect(() => {
    const videos = [
      "/assets/Video1.mp4",
      "/assets/Video2.mp4",
      "/assets/Video3.mp4",
    ];
    let currentIndex = 0;

    const playNext = () => {
      currentIndex = (currentIndex + 1) % videos.length;
      if (sourceRef.current) {
        sourceRef.current.src = videos[currentIndex];
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play();
        }
      }
    };

    const interval = setInterval(playNext, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/hero-fallback.png"
        >
          <source ref={sourceRef} src="/assets/Video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-content container">
          <h1>Transform Your Life at Calabar's Best Gym</h1>
          <p>Modern Equipment • Expert Trainers • Energizing Group Classes</p>
          <button
            className="btn-primary free"
            onClick={() => setShowTrialForm(true)}
          >
            Get Free Trial
          </button>
          {showTrialForm && (
            <FreeTrialForm onClose={() => setShowTrialForm(false)} />
          )}
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose CallyGym?</h2>
          <div className="grid">
            <div className="feature-card">
              <img src="/assets/classes.png" alt="Group Classes" />
              <h3>Diverse Classes</h3>
              <p>
                Yoga, HIIT, Zumba, Strength Training & More – All Levels Welcome
              </p>
            </div>
            <div className="feature-card">
              <img src="/assets/trainers.jpeg" alt="Expert Trainers" />
              <h3>Certified Trainers</h3>
              <p>
                Personalized coaching to help you reach your fitness goals
                faster
              </p>
            </div>
            <div className="feature-card">
              <img src="/assets/equipment.jpg" alt="Modern Equipment" />
              <h3>State-of-the-Art Equipment</h3>
              <p>
                Latest machines, free weights, and functional training zones
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Members Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>
                "Best gym in Calabar! The trainers are amazing and the vibe is
                motivating."
              </p>
              <strong>– Peter B, Member</strong>
            </div>
            <div className="testimonial-card">
              <p>
                "Lost 15kg in 4 months thanks to the classes and personal
                training. Highly recommend!"
              </p>
              <strong>– Godwin A., Member</strong>
            </div>
            <div className="testimonial-card">
              <p>
                "Clean, modern, and welcoming. Finally a gym I actually enjoy
                going to!"
              </p>
              <strong>– Lilian N., Member</strong>
            </div>
            <div className="testimonial-card">
              <p>
                "Sleek, refreshing, and thoughtfully designed. The kind of gym
                that lifts your mood the moment you walk in and keeps you
                committed to your goals."
              </p>
              <strong>– Martins O., Member</strong>
            </div>
            <div className="testimonial-card">
              <p>
                "Fresh, well-designed, and full of positive energy. This gym
                makes every workout feel enjoyable and keeps me coming back
                without effort."
              </p>
              <strong>– Isaac W., Member</strong>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
