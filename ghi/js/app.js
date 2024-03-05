function createCard(name, description, pictureUrl,starts, ends, location) {

    const formattedStarts = new Date(starts).toLocaleDateString('en-US');
    const formattedEnds = new Date(ends).toLocaleDateString('en-US');

    return `
      <div class="card shadow mb-5 bg-body-tertiary rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">
            <p>${formattedStarts} - ${formattedEnds}</p>
        </div>
      </div>
    `;
  }

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try
    {
        const response = await fetch(url);

        if (!response.ok)
        {
            console.log(response.status);
        }
        else
        {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const starts = details.conference.starts;
                    const ends = details.conference.ends;
                    const location = details.conference.location.name;
                    const html = createCard(name, description, pictureUrl, starts, ends, location);
                    const column = document.querySelector('.col');
                    column.innerHTML += html;
                }
            }


        }
    }
    catch(e)
    {
        console.log('Error fetching response');
    }
});
