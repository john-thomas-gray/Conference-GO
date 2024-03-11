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
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="conferences/new" element={<ConferenceForm />} />
        <Route path="attendees/new" element={<AttendConferenceForm />} />
        <Route path="locations/new" element={<LocationForm />} />
        <Route path="presentations/new" element={<PresentationForm />} />
        <Route path="attendees" element={<AttendeesList attendees={props.attendees} />} />
        <Route index element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
