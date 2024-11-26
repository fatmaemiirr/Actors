const url = 'https://moviesdatabase.p.rapidapi.com/actors';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '27b69ba214msh5567206a6702962p157ac6jsnc1a2ca3732e3', // Gerçek API anahtarınızı buraya yazın
        'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
    }
};

async function fetchActors() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('Fetched data:', result); // Veriyi konsola yazdırın

        if (result && Array.isArray(result.results)) {
            displayActors(result.results);
        } else {
            console.error('Error: Invalid data format', result);
        }
    } catch (error) {
       
    }
}

function displayActors(actors) {
    const actorList = document.getElementById('actorList');
    actorList.innerHTML = '';

    actors.forEach(actor => {
        const actorCard = document.createElement('div');
        actorCard.className = 'actor-card';
        actorCard.innerHTML = `
            <h3>${actor.primaryName}</h3>
            <p>${actor.primaryProfession || 'Meslek bilgisi bulunamadı'}</p>
            <p>${actor.knownForTitles ? actor.knownForTitles.join(', ') : 'Bilinen çalışmaları bulunamadı'}</p>
        `;
        actorList.appendChild(actorCard);
    });
}

fetchActors();

const actors = [];
let currentActor = null;

function openModal(actor = null) {
    currentActor = actor;
    const modalTitle = document.getElementById('modalTitle');
    const actorNameInput = document.getElementById('actorName');
    const actorDescriptionInput = document.getElementById('actorDescription');

    if (actor) {
        modalTitle.textContent = 'Aktörü Düzenle';
        actorNameInput.value = actor.name;
        actorDescriptionInput.value = actor.description;
    } else {
        modalTitle.textContent = 'Yeni Aktör Ekle';
        actorNameInput.value = '';
        actorDescriptionInput.value = '';
    }

    document.getElementById('modalOverlay').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
}

function saveActor() {
    const actorName = document.getElementById('actorName').value;
    const actorDescription = document.getElementById('actorDescription').value;

    if (currentActor) {
        currentActor.name = actorName;
        currentActor.description = actorDescription;
    } else {
        const newActor = {
            id: actors.length + 1,
            name: actorName,
            description: actorDescription
        };
        actors.unshift(newActor); // Liste başına ekle
    }

    renderActors();
    closeModal();
}

function renderActors() {
    const actorList = document.getElementById('actorList');
    actorList.innerHTML = '';

    actors.forEach(actor => {
        const actorCard = document.createElement('div');
        actorCard.className = 'actor-card';
        actorCard.innerHTML = `
            <h3>${actor.name}</h3>
            <p>${actor.description || 'Açıklama bulunamadı'}</p>
            <button onclick="editActor(${actor.id})">Düzenle</button>
        `;
        actorList.appendChild(actorCard);
    });
}

function editActor(id) {
    const actor = actors.find(actor => actor.id === id);
    openModal(actor);
}
