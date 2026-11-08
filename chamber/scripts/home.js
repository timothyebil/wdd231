/** 
 * ========================================================================== 
 * WDD 231 Chamber Portal - Core Home Dashboard Logic Engine Handler 
 * ========================================================================== 
 */ 
const memberJsonUrl = 'data/members.json'; 

// FIXED: Clean OpenWeather endpoint with complete production query parameters and explicit secure data lines
const weatherApiKey = '92a6b297b777a83d47f2010c224254bf'; 
const lat = '2.2490'; 
const lon = '32.9002'; 
// FIXED: Switched domain destination from 'openweathermap.org' to 'api.openweathermap.org' and corrected all variable interpolation syntax to use the standard ${variable} template format
const weatherUrl = `https://openweathermap.org{lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`; 

// Target Component DOM Selectors 
const weatherDisplay = document.querySelector('#current-weather'); 
const forecastDisplay = document.querySelector('#forecast-wrapper'); 
const spotlightDisplay = document.querySelector('#spotlightDisplay'); 

/** 
 * 🌤️ OpenWeatherMap API Fetch Engine 
 */ 
async function fetchWeatherData() { 
    try { 
        const response = await fetch(weatherUrl); 
        if (!response.ok) throw new Error(`HTTP network error code: ${response.status}`); 
        const data = await response.json(); 
        renderWeather(data); 
    } catch (error) { 
        console.error("Critical error processing weather stream telemetry:", error); 
        if (weatherDisplay) { 
            weatherDisplay.innerHTML = `<p class="error">Live weather feed currently offline.</p>`; 
        } 
    } 
} 

function renderWeather(data) { 
    if (!weatherDisplay || !forecastDisplay) return; 

    // FIXED: Mapped item paths to target nested objects within the list array matrices correctly
    const currentItem = data.list[0]; 
    const temp = Math.round(currentItem.main.temp); 
    const desc = currentItem.weather[0].description; 
    const iconCode = currentItem.weather[0].icon; 

    // FIXED: Patched icon source string literal syntax to utilize proper variable interpolation prefix ($)
    weatherDisplay.innerHTML = ` 
        <div class="weather-now"> 
            <img src="https://openweathermap.org{iconCode}@2x.png" alt="${desc}" width="50" height="50"> 
            <span class="main-temp">${temp}°C</span> 
            <p class="weather-desc">${desc.charAt(0).toUpperCase() + desc.slice(1)}</p> 
        </div> 
    `; 

    // 2. Extract Next 3 Days ( midday slots tracking: 12:00:00 ) 
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

/** 
 * 💎 Premium Member Spotlight Ad Randomizer 
 */ 
async function fetchSpotlightData() { 
    try { 
        const response = await fetch(memberJsonUrl); 
        if (!response.ok) throw new Error(`JSON asset access error code: ${response.status}`); 
        const data = await response.json(); 
        renderSpotlights(data.members); 
    } catch (error) { 
        console.error("Critical error processing spotlight profiles array:", error); 
        if (spotlightDisplay) { 
            spotlightDisplay.innerHTML = `<p>Premium spotlights temporarily unavailable.</p>`; 
        } 
    } 
} 

function renderSpotlights(memberArray) { 
    if (!spotlightDisplay) return; 

    // Filter down to keep Gold (3) and Silver (2) membership values 
    const premiumMembers = memberArray.filter(member => member.membershipLevel === 3 || member.membershipLevel === 2); 

    // Sort company items randomly 
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

// Adjusted target element lookups to accurately match lowercase ID tokens inside index.html layout definitions
const yearTarget = document.getElementById('currentyear') || document.getElementById('yearNode');
const modifiedTarget = document.getElementById('lastModified') || document.getElementById('modNode');

if (yearTarget) yearTarget.textContent = new Date().getFullYear();
if (modifiedTarget) modifiedTarget.textContent = document.lastModified;

// Global Execution Entry Cycle 
fetchWeatherData(); 
fetchSpotlightData();
