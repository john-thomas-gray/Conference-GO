function createCard(title, description, pictureUrl) {
    return `
      <div class="card">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
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
                    const title = details.conference.title;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const html = createCard(title, description, pictureUrl);
                    const column = document.querySelector('.col');
                    column.innerHTML += html;
                    console.log(html);
                }
            }


        }
    }
    catch(e)
    {
        console.log('Error fetching response');
    }
});
