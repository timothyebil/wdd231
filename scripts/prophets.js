const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');
const gridBtn = document.querySelector('#gridBtn');
const listBtn = document.querySelector('#listBtn');

let prophetList = []; 
let currentFilter = 'all'; 

// Dynamically structures and appends DOM fragments into target viewport arrays
const displayProphets = (prophets) => {
  cards.innerHTML = '';

  prophets.forEach((prophet) => {
    const card = document.createElement('section');
    const fullName = document.createElement('h2');
    const birthDate = document.createElement('p');
    const birthPlace = document.createElement('p');
    const portrait = document.createElement('img');

    // Mapped precisely to JSON keys
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);
    
    cards.appendChild(card);
  });
};

// Asynchronous fetch orchestration engine
async function getProphetData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    prophetList = data.prophets;
    applyFilterAndRender();
  } catch (error) {
    console.error(error);
  }
}

// Logic framework handling conditional criteria filtering rules
const applyFilterAndRender = () => {
  let filteredList = [...prophetList];

  if (currentFilter === 'utah') {
    filteredList = prophetList.filter(prophet => prophet.birthplace.includes('Utah'));
  } else if (currentFilter === 'outside') {
    filteredList = prophetList.filter(prophet => prophet.birthplace.includes('England'));
  } else if (currentFilter === 'long-serve') {
    filteredList = prophetList.filter(prophet => prophet.length >= 15);
  }

  displayProphets(filteredList);
};

// Clean UI modifier controller
const toggleButtonClass = (targetSelector, clickedButton) => {
  document.querySelectorAll(targetSelector).forEach(btn => btn.classList.remove('active'));
  clickedButton.classList.add('active');
};

// Event Listeners for Filters
document.querySelector('#all').addEventListener('click', (e) => {
  currentFilter = 'all';
  toggleButtonClass('.filter-group button', e.target);
  applyFilterAndRender();
});

document.querySelector('#utah').addEventListener('click', (e) => {
  currentFilter = 'utah';
  toggleButtonClass('.filter-group button', e.target);
  applyFilterAndRender();
});

document.querySelector('#outside').addEventListener('click', (e) => {
  currentFilter = 'outside';
  toggleButtonClass('.filter-group button', e.target);
  applyFilterAndRender();
});

document.querySelector('#long-serve').addEventListener('click', (e) => {
  currentFilter = 'long-serve';
  toggleButtonClass('.filter-group button', e.target);
  applyFilterAndRender();
});

// Layout Toggles
gridBtn.addEventListener('click', (e) => {
  cards.className = 'grid-view';
  toggleButtonClass('.layout-group button', e.target);
});

listBtn.addEventListener('click', (e) => {
  cards.className = 'list-view';
  toggleButtonClass('.layout-group button', e.target);
});

getProphetData();
