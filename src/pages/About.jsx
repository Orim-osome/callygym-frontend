import "../styles/about.css";

export default function About() {
  return (
    <section className="about">
      <div className="container">
        <h1 className="section-title">About CallyGym</h1>
        <p className="about-text">
          Welcome to CallyGym – Calabar's leading fitness community since 2026.
          We're passionate about helping every member achieve their health goals
          in a welcoming, modern environment.
        </p>

        <div className="grid about-grid">
          <img src="/assets/interior1.png" alt="Gym Interior" />
          <img src="/assets/interior2.png" alt="Gym Interior" />
          <img src="/assets/team.png" alt="Our Team" />
        </div>

        <h2>Our Mission</h2>
        <p>
          To empower Calabar residents with world-class facilities, expert
          guidance, and a supportive community that makes fitness enjoyable and
          sustainable.
        </p>
      </div>
    </section>
  );
}
