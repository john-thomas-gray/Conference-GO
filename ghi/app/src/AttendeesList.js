import React, {useEffect, useState } from 'react';

export default function AttendeesList(props) {

  const [attendees, setAttendees] = useState([]);

  const fetchData = async () => {
    const url = 'http://localhost:8001/api/attendees/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAttendees(data.attendees);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])
  
  return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Conference</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map(attendee => {
            return (
              <tr key={ attendee.href }>
                <td>{ attendee.name }</td>
                <td>{ attendee.conference }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
