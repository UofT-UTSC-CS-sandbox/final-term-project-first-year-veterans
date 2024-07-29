import React, { useState } from "react";
import "../Asset/Css/Mentor.css";
import MentorList from "./MentorList.js";
import AppointmentForm from "./AppointmentForm.js";
import MentorForm from "./MentorForm.js";

function Mentorship() {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [mentors, setMentors] = useState([
    {
      id: 1,
      name: "John",
      expertise: "Physics",
      availability: [{ day: "Monday", startTime: "09:00", endTime: "17:00" }],
    },
    {
      id: 2,
      name: "Ali",
      expertise: "Mathematics",
      availability: [
        { day: "Wednesday", startTime: "10:00", endTime: "16:00" },
      ],
    },
    {
      id: 3,
      name: "Andy",
      expertise: "Computer Science",
      availability: [{ day: "Friday", startTime: "11:00", endTime: "15:00" }],
    },
  ]);
  const [showMentorForm, setShowMentorForm] = useState(false);

  const handleMentorSelect = (mentor) => {
    setSelectedMentor(mentor);
  };

  const handleAppointmentBook = (appointment) => {
    setAppointments([...appointments, appointment]);
    setSelectedMentor(null); // Reset after booking
  };

  const handleDeleteAppointment = (index) => {
    const newAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(newAppointments);
  };

  const handleMentorCreate = (mentor) => {
    setMentors([...mentors, { ...mentor, id: mentors.length + 1 }]);
    setShowMentorForm(false); // Hide form after creating
  };

  return (
    <div className="MP-App">
      <header className="MP-App-header">
        <div className="MP-sidebar">
          <button onClick={() => setShowMentorForm(true)}>
            Create Mentor Posting
          </button>
        </div>
        <div className="MP-main-content">
          {showMentorForm ? (
            <MentorForm onCreate={handleMentorCreate} />
          ) : selectedMentor ? (
            <AppointmentForm
              mentor={selectedMentor}
              onBook={handleAppointmentBook}
            />
          ) : (
            <MentorList mentors={mentors} onSelect={handleMentorSelect} />
          )}
        </div>
        <div className="appointments">
          <h2>Booked Appointments</h2>
          <ul>
            {appointments.map((appt, index) => (
              <li key={index}>
                Appointment with {appt.mentor.name} on {appt.date} at{" "}
                {appt.time} for {appt.duration} hour
                {appt.duration > 1 ? "s" : ""}
                <button
                  className="MP-delete-button"
                  onClick={() => handleDeleteAppointment(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Mentorship;