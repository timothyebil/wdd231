// Populate the copyright year field dynamically
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Populate document version history modified metadata timestamp properties
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
