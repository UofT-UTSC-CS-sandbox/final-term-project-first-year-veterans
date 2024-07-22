import React, { useState } from "react";

const hours = Array.from({ length: 24 }, (_, i) => i);
const durations = [1, 2, 3, 4, 5, 6];

function AppointmentForm({ mentor, onBook }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    onBook({ mentor, date, time, duration });
  };

  return (
    <div>
      <h2>Book Appointment with {mentor.name}</h2>
      <form className="MP-form" onSubmit={handleSubmit}>
        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Time:
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            >
              <option value="">Select Time</option>
              {hours.map((hour) => (
                <>
                  <option
                    key={`${hour}:00`}
                    value={`${hour}:00`}
                  >{`${hour}:00`}</option>
                  <option
                    key={`${hour}:30`}
                    value={`${hour}:30`}
                  >{`${hour}:30`}</option>
                </>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Duration:
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            >
              {durations.map((d) => (
                <option key={d} value={d}>{`${d} hour${
                  d > 1 ? "s" : ""
                }`}</option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default AppointmentForm;
