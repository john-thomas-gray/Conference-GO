import React, {useEffect, useState } from 'react';

export default function AttendConferenceForm(props) {

  const initialState = {
    conference : '',
    name: '',
    email: '',
  }

  const [formData, setFormData] = useState (initialState);
  const [hasSignedUp, setHasSignedUp] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.conference = formData.conference;
    data.name = formData.name;
    data.email = formData.email;

    const attendeeUrl = 'http://localhost:8001/api/attendees/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const attendeeResponse = await fetch(attendeeUrl, fetchOptions);
    if (attendeeResponse.ok) {
      setFormData(initialState)
      setHasSignedUp(true);
    }
  }

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

   // CSS classes for rendering
   let spinnerClasses = 'd-flex justify-content-center mb-3';
   let dropdownClasses = 'form-select d-none';
   if (props.conferences.length > 0) {
     spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
     dropdownClasses = 'form-select';
   }

   let messageClasses = 'alert alert-success d-none mb-0';
   let formClasses = '';
   if (hasSignedUp) {
     messageClasses = 'alert alert-success mb-0';
     formClasses = 'd-none';
   }

   return (
     <div className="my-5 container">
       <div className="row">
         <div className="col">
           <div className="card shadow">
             <div className="card-body">
               <form className={formClasses} onSubmit={handleSubmit} id="create-attendee-form">
                 <h1 className="card-title">It's Conference Time!</h1>
                 <p className="mb-3">
                   Please choose which conference
                   you'd like to attend.
                 </p>
                 <div className={spinnerClasses} id="loading-conference-spinner">
                   <div className="spinner-grow text-secondary" role="status">
                     <span className="visually-hidden">Loading...</span>
                   </div>
                 </div>
                 <div className="mb-3">
                   <select onChange={handleInputChange} name="conference" id="conference" className={dropdownClasses} required>
                     <option value="">Choose a conference</option>
                     {props.conferences.map(conference => {
                       return (
                         <option key={conference.href} value={conference.href}>{conference.name}</option>
                       )
                     })}
                   </select>
                 </div>
                 <p className="mb-3">
                   Now, tell us about yourself.
                 </p>
                 <div className="row">
                   <div className="col">
                     <div className="form-floating mb-3">
                       <input onChange={handleInputChange} required placeholder="Your full name" type="text" id="name" name="name" className="form-control" />
                       <label htmlFor="name">Your full name</label>
                     </div>
                   </div>
                   <div className="col">
                     <div className="form-floating mb-3">
                       <input onChange={handleInputChange} required placeholder="Your email address" type="email" id="email" name="email" className="form-control" />
                       <label htmlFor="email">Your email address</label>
                     </div>
                   </div>
                 </div>
                 <button className="btn btn-lg btn-primary">I'm going!</button>
               </form>
               <div className={messageClasses} id="success-message">
                 Congratulations! You're all signed up!
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 }

  
