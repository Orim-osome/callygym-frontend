import { useState } from "react";

export default function FreeTrialForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(
        "https://callygym-backend.onrender.com/api/free-trial",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#1e1e1e",
          padding: "2.5rem",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "450px",
          color: "white",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "2rem",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <h2 style={{ marginBottom: "1.5rem" }}>Get Your Free Trial</h2>

        {success ? (
          <div style={{ textAlign: "center" }}>
            <h3 style={{ color: "#00C853" }}>Success!</h3>
            <p>
              Thank you, {formData.name}! Your free trial request has been
              submitted.
            </p>
            <p>We will contact you shortly via email or phone.</p>
            <button
              onClick={onClose}
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
        ) : (
          <form onSubmit={handleSubmit}>
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

            {error && (
              <p style={{ color: "#FF6B00", marginBottom: "1rem" }}>{error}</p>
            )}

            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#444",
                  border: "none",
                  borderRadius: "6px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
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
                {loading ? "Submitting…" : "Get Free Trial"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
