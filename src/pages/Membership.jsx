import "../styles/pricing.css";
import PaymentForm from "../components/PaymentForm.jsx";

export default function Membership() {
  return (
    <section className="pricing-page">
      <div className="container">
        <h1 className="section-title">Membership Plans</h1>
        <p
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Choose the plan that fits your goals. Ready to join?
          <a href="/contact" style={{ color: "#FF6B00", fontWeight: "bold" }}>
            Contact us for details
          </a>
        </p>
        <div className="pricing-grid">
          <div className="price-card">
            <h3>Basic</h3>
            <p className="price">
              ₦15,000<span>/month</span>
            </p>
            <ul>
              <li>Gym Access</li>
              <li>Free Weights</li>
            </ul>
            <PaymentForm
              buttonText="Join Basic"
              amountNaira={15000}
              planName="Basic Plan"
            />
            {/* <button className="btn-primary">Join Now</button> */}
          </div>
          <div className="price-card featured">
            <h3>Premium</h3>
            <p className="price">
              ₦30,000<span>/month</span>
            </p>
            <ul>
              <li>All Access</li>
              <li>Classes Included</li>
              <li>Personal Trainer Session</li>
            </ul>
            <PaymentForm
              buttonText="Join Premium"
              amountNaira={30000}
              planName="Premium Plan"
            />
            {/* <button className="btn-primary">Join Now</button> */}
          </div>

          <div className="price-card vip">
            <div className="vip-badge">
              <h3>VIP Elite</h3>
            </div>

            <p className="price">
              ₦60,000<span>/month</span>
            </p>
            <ul>
              <li>Priority 24/7 Access + Reserved Parking</li>
              <li>Unlimited Group & Specialty Classes</li>
              <li>4 Personal Training Sessions/Month</li>
              <li>Monthly Recovery Session (Sauna/Massage)</li>
              <li>2 Guest Passes per Month</li>
              <li>Exclusive VIP Lounge Access</li>
              <li>Custom Nutrition Plan</li>
              <li>Merch Discount (20%)</li>
            </ul>
            <PaymentForm
              buttonText="Join VIP"
              amountNaira={60000}
              planName="VIP Plan"
            />
            {/* <button className="btn-primary vip-btn">Join VIP</button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
