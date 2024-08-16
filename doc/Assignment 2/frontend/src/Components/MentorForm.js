import React, { useState } from "react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function MentorForm({ onCreate }) {
  const [name, setName] = useState("");
  const [expertise, setExpertise] = useState("");
  const [availability, setAvailability] = useState([
    { day: "", startTime: "", endTime: "" },
  ]);

  const handleAddAvailability = () => {
    setAvailability([...availability, { day: "", startTime: "", endTime: "" }]);
  };

  const handleAvailabilityChange = (index, field, value) => {
    const newAvailability = [...availability];
    newAvailability[index][field] = value;
    setAvailability(newAvailability);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate({ name, expertise, availability });
  };

  return (
    <div>
      <h2>Create Mentor Posting</h2>
      <form className="MP-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Expertise:
            <input
              type="text"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>Availability:</label>
          {availability.map((slot, index) => (
            <div key={index}>
              <select
                value={slot.day}
                onChange={(e) =>
                  handleAvailabilityChange(index, "day", e.target.value)
                }
                required
              >
                <option value="">Select Day</option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <input
                type="time"
                value={slot.startTime}
                onChange={(e) =>
                  handleAvailabilityChange(index, "startTime", e.target.value)
                }
                required
              />
              to
              <input
                type="time"
                value={slot.endTime}
                onChange={(e) =>
                  handleAvailabilityChange(index, "endTime", e.target.value)
                }
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddAvailability}>
            Add More
          </button>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default MentorForm;
