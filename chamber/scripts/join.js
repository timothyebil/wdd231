/**
 * ==========================================================================
 * WDD 231 Chamber Portal - Join Form, Modals & Confirmation Handler
 * ==========================================================================
 */

// 1. Populate Hidden Timestamp Field on join.html
const timestampField = document.querySelector('#formTimestamp');
if (timestampField) {
    timestampField.value = new Date().toLocaleString();
}

// 2. Interactive Modal Triggers (Zero inline onclick handlers)
const openLinks = document.querySelectorAll('.modal-open-btn');
const closeButtons = document.querySelectorAll('.modal-close-btn');
const dialogs = document.querySelectorAll('.tier-modal');

openLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('data-modal');
        const dialog = document.getElementById(targetId);
        if (dialog) {
            dialog.showModal();
        }
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const dialog = btn.closest('dialog');
        if (dialog) {
            dialog.close();
        }
    });
});

dialogs.forEach(dialog => {
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});

// 3. Parse and Display Required Form Fields on thankyou.html
const resultsContainer = document.querySelector('#submissionResults');
if (resultsContainer) {
    const params = new URLSearchParams(window.location.search);
    const firstName = params.get('fname') || 'Not provided';
    const lastName = params.get('lname') || 'Not provided';
    const email = params.get('email') || 'Not provided';
    const phone = params.get('phone') || 'Not provided';
    const organization = params.get('organization') || 'Not provided';
    const timestamp = params.get('timestamp') || new Date().toLocaleString();

    resultsContainer.innerHTML = `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Mobile Number:</strong> ${phone}</p>
        <p><strong>Business / Organization Name:</strong> ${organization}</p>
        <p><strong>Application Timestamp:</strong> ${timestamp}</p>
    `;
}
