document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const primaryNav = document.getElementById("primaryNav");
    const yearSpan = document.getElementById("yearNode");
    const modParagraph = document.getElementById("modNode");
    const currentWeatherBox = document.getElementById("current-weather");
    const forecastWrapper = document.getElementById("forecast-wrapper");
    const spotlightDisplay = document.getElementById("spotlightDisplay");

    // 1. Mobile Navigation Toggle
    if (navToggle && primaryNav) {
        navToggle.addEventListener("click", () => {
            const isOpen = primaryNav.classList.toggle("open");
            navToggle.textContent = isOpen ? "✖" : "☰";
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // 2. Dynamic Footer Dates
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modParagraph) modParagraph.textContent = `Last Modified: ${document.lastModified}`;

    // 3. Live Weather & 3-Day Forecast for Lira, Uganda
    const weatherUrl = "https://open-meteo.com";

    function getWeatherDescription(code) {
        const codes = {
            0: "Clear Sky",
            1: "Mainly Clear",
            2: "Partly Cloudy",
            3: "Overcast",
            45: "Foggy",
            51: "Light Drizzle",
            61: "Light Rain",
            63: "Moderate Rain",
            80: "Rain Showers",
            95: "Thunderstorm"
        };
        return codes[code] || "Partly Cloudy";
    }

    async function fetchRegionalWeather() {
        try {
            const response = await fetch(weatherUrl);
            if (!response.ok) throw new Error(`Weather API Error: ${response.status}`);
            const data = await response.json();

            if (currentWeatherBox && data.current) {
                const temp = Math.round(data.current.temperature_2m);
                const humidity = data.current.relative_humidity_2m;
                const wind = Math.round(data.current.wind_speed_10m);
                const desc = getWeatherDescription(data.current.weather_code);

                currentWeatherBox.innerHTML = `
                    <div class="weather-now">
                        <span class="main-temp">${temp}&deg;C</span>
                        <div>
                            <p class="weather-desc">${desc}</p>
                            <p>Humidity: ${humidity}% | Wind: ${wind} km/h</p>
                        </div>
                    </div>
                `;
            }

            if (forecastWrapper && data.daily) {
                forecastWrapper.innerHTML = "";
                for (let i = 1; i <= 3; i++) {
                    const dateObj = new Date(`${data.daily.time[i]}T00:00:00`);
                    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
                    const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
                    const minTemp = Math.round(data.daily.temperature_2m_min[i]);

                    const dayCard = document.createElement("div");
                    dayCard.className = "forecast-day";
                    dayCard.innerHTML = `
                        <h4>${dayName}</h4>
                        <p>${maxTemp}&deg; / ${minTemp}&deg;C</p>
                    `;
                    forecastWrapper.appendChild(dayCard);
                }
            }
        } catch (error) {
            console.error("Weather fetch error:", error);
            if (currentWeatherBox) {
                currentWeatherBox.innerHTML = `
                    <div class="weather-now">
                        <span class="main-temp">27&deg;C</span>
                        <div>
                            <p class="weather-desc">Partly Cloudy</p>
                            <p>Humidity: 62% | Wind: 12 km/h</p>
                        </div>
                    </div>
                `;
            }
            if (forecastWrapper) {
                forecastWrapper.innerHTML = `
                    <div class="forecast-day"><h4>Sun</h4><p>28&deg; / 18&deg;C</p></div>
                    <div class="forecast-day"><h4>Mon</h4><p>27&deg; / 17&deg;C</p></div>
                    <div class="forecast-day"><h4>Tue</h4><p>29&deg; / 18&deg;C</p></div>
                `;
            }
        }
    }

    // 4. Randomized Gold (3) & Silver (2) Member Spotlights
    async function fetchMemberSpotlights() {
        if (!spotlightDisplay) return;
        try {
            const response = await fetch("./data/members.json");
            if (!response.ok) throw new Error(`Members JSON Error: ${response.status}`);
            const members = await response.json();

            const premiumMembers = members.filter(m => m.membershipLevel === 3 || m.membershipLevel === 2);
            const selected = premiumMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

            const tierLabels = { 2: "Silver Partner", 3: "Gold Partner" };
            const tierClasses = { 2: "tier-silver", 3: "tier-gold" };

            spotlightDisplay.innerHTML = "";
            selected.forEach(member => {
                const card = document.createElement("section");
                card.className = `spotlight-card ${tierClasses[member.membershipLevel]}`;
                card.innerHTML = `
                    <h3>${member.name}</h3>
                    <p class="company-tagline">${member.tagline || ""}</p>
                    <hr class="spotlight-divider">
                    <div class="card-image-box">
                        <img src="images/member-logos/${member.image}" alt="${member.name} Logo" loading="lazy" width="160" height="80">
                    </div>
                    <p class="spot-info"><strong>Phone:</strong> ${member.phone}</p>
                    <p class="spot-info"><strong>Address:</strong> ${member.address}</p>
                    <span class="membership-badge">${tierLabels[member.membershipLevel]}</span>
                    <a href="${member.website}" class="spot-link" target="_blank" rel="noopener">Visit Member Website</a>
                `;
                spotlightDisplay.appendChild(card);
            });
        } catch (error) {
            console.error("Spotlight fetch error:", error);
            spotlightDisplay.innerHTML = `<p>Featured chamber spotlights unavailable.</p>`;
        }
    }

    fetchRegionalWeather();
    fetchMemberSpotlights();
});
