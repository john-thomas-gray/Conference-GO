window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/locations/';

    const response = await fetch(url);
    if(!response.ok)
    {
        console.log("Response not okay");
    } else {
        const data = await response.json();
        const selectTag = document.getElementById('location');
        for(let location of data.locations)
        {
            let opt = document.createElement('option');
            opt.value = location.id;
            opt.innerHTML = location.name;
            selectTag.appendChild(opt);
        }
    }

    const form = document.getElementById('create-conference-form');
    form.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = JSON.stringify(Object.fromEntries(formData));
        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(conferenceUrl, fetchConfig);
        if (response.ok) {
            form.reset();
            const newConference = await response.json();
        } else {
            console.error(`Server responded with status: ${response.status}`);
        }

    })
})
