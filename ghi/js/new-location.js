window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/states/';

    const response = await fetch(url);
    if(!response.ok) {
        console.log('Response not okay.');
    } else {
        const data = await response.json();
        const selectTag = document.getElementById('state');
        for(let state of data.states)
        {
            let opt = document.createElement('option');
            opt.value = state[Object.keys(state)[0]];
            opt.innerHTML = Object.keys(state)[0];
            selectTag.appendChild(opt);
        }

    }
    const form = document.getElementById('create-location-form');
    form.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData));
        const locationUrl = 'http://localhost:8000/api/locations/';
        const fetchConfig = {
        method: "post",
        body: json,
        headers: {
            'Content-Type': 'application/json',
        },
        };
        const response = await fetch(locationUrl, fetchConfig);
        if (response.ok) {
        form.reset();
        const newLocation = await response.json();

        }
    });
})
