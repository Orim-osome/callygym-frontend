import { useState, useRef, useEffect } from "react";
import PaystackPop from "@paystack/inline-js";

export default function PaymentForm({
  buttonText = "Pay Now",
  amountNaira = 15000,
  planName = "Membership",
  className = "",
}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [refNumber, setRefNumber] = useState("");

  const modalRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePay = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill Name, Email and Phone");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://callygym-backend.onrender.com/api/payment/initialize",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            planName,
            amountNaira,
            className,
            userDetails: formData,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to start payment");
      }
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: "pk_test_3be21fa7aacba8483752513997be945d6608f9ed",
        email: formData.email,
        amount: amountNaira * 100,
        ref: data.reference,
        metadata: {
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          type: className ? "class_booking" : "membership",
          item: className || planName,
        },
        onClose: () => {
          setLoading(false);
        },
        onSuccess: async (response) => {
          setLoading(false);
          setRefNumber(response.reference);
          setPaymentSuccess(true);
          setShowForm(false);

          // Save booking to backend
          try {
            const bookingRes = await fetch(
              "https://callygym-backend.onrender.com/api/bookings",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name: formData.name,
                  email: formData.email,
                  phone: formData.phone,
                  preferredDate: new Date().toISOString(),
                }),
              },
            );

            const bookingData = await bookingRes.json();

            if (bookingData.success) {
              console.log("Booking saved! ID:", bookingData.bookingId);
              alert("Payment successful & booking confirmed!");
            } else {
              console.error("Booking save failed:", bookingData.message);
              alert(
                "Payment was successful, but booking save failed. Please contact us.",
              );
            }
          } catch (err) {
            console.error("Error saving booking:", err);
            alert(
              "Payment successful, but error saving booking. Contact support.",
            );
          }
        },
      });
    } catch (err) {
      setLoading(false);
      alert(err.message || "Payment failed");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showForm &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setShowForm(false);
      }
    };

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  return (
    <>
      {paymentSuccess && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            zIndex: 3000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#1e1e1e",
              padding: "3rem",
              borderRadius: "12px",
              textAlign: "center",
              color: "white",
              maxWidth: "400px",
            }}
          >
            <h2 style={{ color: "#00C853" }}>Payment Successful!</h2>
            <p style={{ margin: "1rem 0" }}>
              <strong>This was a test transaction</strong>
              <br />
              No real money was debited.
              <br />
              Your booking has been recorded — we'll contact you soon!
            </p>
            <p>Reference: {refNumber}</p>
            <p>Thank you, {formData.name}! We will contact you soon.</p>
            <button
              onClick={() => setPaymentSuccess(false)}
              style={{
                marginTop: "1.5rem",
                padding: "12px 24px",
                background: "#00C853",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <button
        className="btn-primary"
        onClick={() => setShowForm(true)}
        disabled={loading}
      >
        {loading ? "Processing…" : buttonText}
      </button>

      {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
        >
          <div
            ref={modalRef}
            style={{
              background: "#1e1e1e",
              padding: "2.5rem",
              borderRadius: "12px",
              width: "90%",
              maxWidth: "480px",
              color: "white",
              boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
              pointerEvents: "auto",
              transform: "translateZ(0)",
              willChange: "transform, opacity",
              isolation: "isolate",
              backfaceVisibility: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h3>{className ? `Book ${className}` : `Join ${planName}`}</h3>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#aaa",
                  fontSize: "2.2rem",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>

            <input
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "1rem",
                borderRadius: "6px",
                border: "1px solid #444",
                background: "#222",
                color: "white",
              }}
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "1rem",
                borderRadius: "6px",
                border: "1px solid #444",
                background: "#222",
                color: "white",
              }}
            />

            <input
              name="phone"
              type="tel"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "1.5rem",
                borderRadius: "6px",
                border: "1px solid #444",
                background: "#222",
                color: "white",
              }}
            />

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#333",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handlePay}
                disabled={loading}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: loading ? "#555" : "#FF6B00",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Processing…" : "Pay Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
