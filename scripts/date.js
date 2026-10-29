// Output current year parameter securely 
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Output dynamic document specification modification logs
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;
