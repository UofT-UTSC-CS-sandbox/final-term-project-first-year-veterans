import React from "react";

function MentorList({ mentors, onSelect }) {
  return (
    <div className="mList">
      <h2>Mentorship Postings</h2>
      <ul>
        {mentors.map((mentor) => (
          <li key={mentor.id}>
            <div>
              {mentor.name} - {mentor.expertise}
            </div>
            <div className="availability-title">Available:</div>
            <div className="availability">
              {mentor.availability.map((slot, index) => (
                <div key={index}>
                  {slot.day}s {slot.startTime} - {slot.endTime}
                </div>
              ))}
            </div>
            <button className="MP-button" onClick={() => onSelect(mentor)}>
              Book Appointment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MentorList;
