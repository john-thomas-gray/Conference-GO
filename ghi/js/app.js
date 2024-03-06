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



var alertPlaceholder = document.getElementById('liveAlertPlaceholder')

function alert(message, type) {
  var wrapper = document.createElement('div');
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

  alertPlaceholder.append(wrapper);
}

window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            alert('Error fetching data!', 'danger');
            console.log('Response not okay.');
        } else {
            const data = await response.json();
            let i = 0;
            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                i++;
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const starts = details.conference.starts;
                    const ends = details.conference.ends;
                    const location = details.conference.location.name;
                    const html = createCard(name, description, pictureUrl, starts, ends, location);
                    let column = undefined;
                    if (i === 1)
                    {
                      column = document.getElementById('col1');
                      console.log('col 1');

                    } else if (i === 2)
                    {
                      column = document.getElementById('col2');
                      console.log('col 2');

                    }
                    else
                    {
                      column = document.getElementById('col3');
                      console.log('col 3');

                      i = 0;
                    }
                    column.innerHTML += html;

                }
                else
                {
                    alert('Error fetching conference details!', 'danger');
                }
            }

        }
    } catch (e) {
        console.log('Error fetching response', e);
        alert('An unexpected error occurred!', 'danger');
    }
});
