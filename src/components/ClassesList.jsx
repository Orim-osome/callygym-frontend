import { useState, useEffect } from "react";
import api from "../api/api";

const ClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get("/classes");
        setClasses(response.data);
      } catch (err) {
        console.error("Failed to load classes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  // Book Class
  const bookClass = async (classId) => {
    try {
      await api.post("/bookings", { classId });
      alert("Class booked successfully!");
      const updatedClasses = classes.map((cls) =>
        cls.id === classId
          ? { ...cls, spotsAvailable: cls.spotsAvailable - 1 }
          : cls
      );
      setClasses(updatedClasses);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to book class");
    }
  };

  if (loading) return <div>Loading classes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Available Classes</h2>
      {classes.length === 0 ? (
        <p>No classes available yet</p>
      ) : (
        <ul>
          {classes.map((cls) => (
            <li key={cls.id}>
              <strong>{cls.name}</strong> - {cls.day} at {cls.time}
              <br />
              {cls.description} (Spots left: {cls.spotsAvailable})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClassesList;
