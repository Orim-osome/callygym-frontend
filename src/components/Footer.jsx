import { useState, useEffect } from "react";
import "../styles/footer.css";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const checkGymStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      // Gym hours: 5AM to 10PM (22:00)
      if (hour >= 5 && hour < 21) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkGymStatus();
    const interval = setInterval(checkGymStatus, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3 className="logo-footer">CallyGym</h3>
          <p>
            Calabar's premier fitness destination. Transform your body and mind.
          </p>
          <p className="gym-status">
            Status:{" "}
            <span className={isOpen ? "open" : "closed"}>
              {isOpen ? "Open Now" : "Closed"}
            </span>
            {" • 5:00 AM – 9:00 PM Daily "}
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/classes">Classes</a>
            </li>
            <li>
              <a href="/membership">Membership</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>
            123 Fitness Avenue, Marian Road
            <br />
            Calabar, Cross River State
          </p>
          <p>Phone: +234 901 440 9340</p>
          <p>Email: info@CallyGym.ng</p>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61550735873861">
              Facebook
            </a>
            <a href="#">Instagram</a>
            <a href="#">WhatsApp</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} CallyGym. All rights reserved.</p>
      </div>
    </footer>
  );
}
