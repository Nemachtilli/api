const privateKey = '4f3500c5537e8baced86f959de28d2d4d097a1ef',
    publicKey = '6a543551d40c9cf72b4287155ca26268';
    content = document.getElementById('content');

const container = document.querySelector('#content');
let contentHTML = '';

const getConnection = () => {
    const ts = Date.now(),
        hash = md5(ts + privateKey + publicKey);
    fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then((json) => {
            for (const hero of json.data.results) {
                let urlHero = hero.urls[0].url;
                contentHTML += `
                <div class="col-4">
                    <a href="${urlHero}" target="_blank">
                        <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                    </a>
                    <h3 class="title">${hero.name}</h3>
                </div>`;
            }
            container.innerHTML = contentHTML;
        })
}


getConnection();