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

// 2. Interactive Modal Triggers (No inline onclick attributes)
const openButtons = document.querySelectorAll('.modal-open-btn');
const closeButtons = document.querySelectorAll('.modal-close-btn');
const dialogs = document.querySelectorAll('.tier-modal');

openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-modal');
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

// Close modal when clicking outside the dialog box
dialogs.forEach(dialog => {
    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});

// 3. Parse URL Query Parameters on thankyou.html
const resultsContainer = document.querySelector('#submissionResults');
if (resultsContainer) {
    const params = new URLSearchParams(window.location.search);
    const firstName = params.get('fname') || 'Applicant';
    const lastName = params.get('lname') || '';
    const email = params.get('email') || 'Not provided';
    const phone = params.get('phone') || 'Not provided';
    const organization = params.get('organization') || 'Not provided';
    const membership = params.get('membership') || 'Not selected';
    const timestamp = params.get('timestamp') || new Date().toLocaleString();

    resultsContainer.innerHTML = `
        <p><strong>Applicant Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Mobile Phone:</strong> ${phone}</p>
        <p><strong>Business / Organization:</strong> ${organization}</p>
        <p><strong>Selected Tier:</strong> ${membership}</p>
        <p><strong>Submitted On:</strong> ${timestamp}</p>
    `;
}
