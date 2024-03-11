import React, { useEffect, useState } from 'react';

function ConferenceForm(props) {

  const [locations, setLocations] = useState( [])

  const [formData, setFormData] = useState ({
    name: '',
    starts: '',
    ends: '',
    description: '',
    created: '',
    updated: '',
    max_presentations: '',
    max_attendees: '',
    location: '',
  })

  const fetchData = async () => {
    const url = 'http://localhost:8000/api/locations/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:8000/api/conferences/';

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setFormData({
        name: '',
        starts: '',
        ends: '',
        description: '',
        max_presentations: '',
        max_attendees: '',
        location: '',
      });
    }
  }

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    setFormData({
      ...formData,
      [inputName]: value
    });
  }
  return (

    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new conference</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" value={formData.name}/>
              <label htmlFor="name">Name</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Starts" required type="date" name="starts" id="starts" className="form-control" value={formData.starts}/>
              <label htmlFor="starts">Starts</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Ends" required type="date" name="ends" id="ends" className="form-control" value={formData.ends}/>
              <label htmlFor="ends">Ends</label>
            </div>

            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <textarea onChange={handleFormChange} id="description" rows="3" name="description" className="form-control" value={formData.description}></textarea>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Maximum presentations" required type="number" name="max_presentations" id="max_presentations" className="form-control" value={formData.max_presentations}/>
              <label htmlFor="max_presentations">Maximum presentations</label>
            </div>

            <div className="form-floating mb-3">
              <input onChange={handleFormChange} placeholder="Maximum attendees" required type="number" name="max_attendees" id="max_attendees" className="form-control" value={formData.max_attendees}/>
              <label htmlFor="max_attendees">Maximum attendees</label>
            </div>

            <div className="mb-3">
              <select onChange={handleFormChange} required name="location" id="location" className="form-select" value={formData.location}>
                <option value="">Choose a location</option>
                {locations.map(location => {
                  return (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  )
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ConferenceForm;
