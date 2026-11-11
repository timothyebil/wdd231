/**
 * ==========================================================================
 * WDD 231 Chamber Portal - Core Home Dashboard Logic Engine Handler
 * ==========================================================================
 */

const memberJsonUrl = 'data/members.json';
const weatherApiKey = '92a6b297b777a83d47f2010c224254bf';
const lat = '2.2490';
const lon = '32.9002';
const weatherUrl = `https://openweathermap.org{lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`;

const weatherDisplay = document.querySelector('#current-weather');
const forecastDisplay = document.querySelector('#forecast-wrapper');
const spotlightDisplay = document.querySelector('#spotlightDisplay');

async function fetchWeatherData() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const data = await response.json();
        renderWeather(data);
    } catch (error) {
        console.error('Weather fetch error:', error);
        if (weatherDisplay) {
            weatherDisplay.innerHTML = `<p class="error">Live weather feed currently offline.</p>`;
        }
    }
}

function renderWeather(data) {
    if (!weatherDisplay || !forecastDisplay) return;

    const currentItem = data.list;
    const temp = Math.round(currentItem.main.temp);
    const desc = currentItem.weather.description;
    const iconCode = currentItem.weather.icon;

    weatherDisplay.innerHTML = `
        <div class="weather-now">
            <img src="https://openweathermap.org{iconCode}@2x.png" alt="${desc}" width="50" height="50">
            <span class="main-temp">${temp}°C</span>
            <p class="weather-desc">${desc.charAt(0).toUpperCase() + desc.slice(1)}</p>
        </div>
    `;

    forecastDisplay.innerHTML = '';
    const dailySlots = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    dailySlots.forEach(slot => {
        const dateObj = new Date(slot.dt * 1000);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const dayTemp = Math.round(slot.main.temp);

        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-day');
        forecastCard.innerHTML = `
            <h4>${dayName}</h4>
            <p>${dayTemp}°C</p>
        `;
        forecastDisplay.appendChild(forecastCard);
    });
}

async function fetchSpotlightData() {
    try {
        const response = await fetch(memberJsonUrl);
        if (!response.ok) throw new Error(`JSON error: ${response.status}`);
        const data = await response.json();
        renderSpotlights(data.members);
    } catch (error) {
        console.error('Spotlight fetch error:', error);
        if (spotlightDisplay) {
            spotlightDisplay.innerHTML = `<p>Premium spotlights temporarily unavailable.</p>`;
        }
    }
}

function renderSpotlights(memberArray) {
    if (!spotlightDisplay) return;

    const premiumMembers = memberArray.filter(member => member.membershipLevel === 3 || member.membershipLevel === 2);
    const randomized = premiumMembers.sort(() => 0.5 - Math.random());
    const selectedSpotlights = randomized.slice(0, 3);

    spotlightDisplay.innerHTML = '';

    selectedSpotlights.forEach(company => {
        const tierLabel = company.membershipLevel === 3 ? 'Gold' : 'Silver';
        const card = document.createElement('div');
        card.classList.add('spotlight-card', `tier-${tierLabel.toLowerCase()}`);
        card.innerHTML = `
            <h3>${company.name}</h3>
            <p class="membership-badge">${tierLabel} Partner</p>
            <hr class="spotlight-divider">
            <p class="spot-info">📍 ${company.address}</p>
            <p class="spot-info">📞 ${company.phone}</p>
            <a href="${company.website}" target="_blank" rel="noopener" class="spot-link">Explore Website</a>
        `;
        spotlightDisplay.appendChild(card);
    });
}

fetchWeatherData();
fetchSpotlightData();
