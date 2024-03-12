import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendConferenceForm from './AttendConferenceForm';
import PresentationForm from './PresentationForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './MainPage'
import React, {useState, useEffect} from 'react';

function App(props) {

  const [conferences, setConferences] = useState([]);
  const getConferences = async () => {
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setConferences(data.conferences);
    }
  }

  useEffect(() => {
    getConferences();
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="conferences/new" element={<ConferenceForm />} />
        <Route path="attendees/new" element={<AttendConferenceForm conferences={conferences }/>} />
        <Route path="locations/new" element={<LocationForm />} />
        <Route path="presentations/new" element={<PresentationForm conferences={conferences} />} />
        <Route path="attendees" element={<AttendeesList />} />
        <Route index element={<MainPage conferences={conferences}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
