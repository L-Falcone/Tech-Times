
let startIndex = 0;

// Funzione per recuperare gli ID delle notizie da Hacker News e aggiornare il codice HTML con i dettagli delle notizie
async function fetchAndDisplayNews(startIndex) {
    // Recupera gli ID delle notizie
    const responseIds = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json');
    const newsIds = await responseIds.json();
  
    // Recupera i dettagli delle notizie utilizzando gli ID
    const promises = newsIds.slice(startIndex, startIndex + 10).map(async id => {
        const responseDetails = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        const newsDetails = await responseDetails.json();
        return {
            title: newsDetails.title,
            link: newsDetails.url,
            date: new Date(newsDetails.time * 1000).toLocaleDateString()
        };
    });
  
    const newsDetails = await Promise.all(promises);


    // Aggiorna il codice HTML con i dettagli delle notizie
    const firstNewsElement = document.querySelector('.first_news');
    firstNewsElement.innerHTML = `${newsDetails[0].title} <br> - ${newsDetails[0].date} <br><a href="${newsDetails[0].link}">Read more...</a>`;

    const midNewsElement = document.querySelector('.mid_news');
    midNewsElement.innerHTML = '';
    for (let i = 1; i <= 4; i++) {
        midNewsElement.innerHTML += `${newsDetails[i].title} <br> - ${newsDetails[i].date}<br><a href="${newsDetails[i].link}">Read more...</a><br><hr>`;
    }

    const oldNewsElement = document.querySelector('.old_news');
    oldNewsElement.innerHTML = '';
    for (let i = 5; i < 10; i++) {
        oldNewsElement.innerHTML += `${newsDetails[i].title} <br> - ${newsDetails[i].date} <br><a href="${newsDetails[i].link}">Read more...</a><br><hr>`;
    }
}

fetchAndDisplayNews(startIndex);

// Funzione per pulsante 'Read more'
document.getElementById('readMore').addEventListener('click', function() {
    startIndex += 10; 
    fetchAndDisplayNews(startIndex);
});


