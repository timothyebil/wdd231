const courses = [
    { subject: 'CSE', number: 110, title: 'Intro to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming Blocks', credits: 3, completed: false },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 4, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 3, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 3, completed: false }
];

const courseDisplay = document.getElementById('courseDisplay');
const totalCreditsSpan = document.getElementById('totalCredits');

function displayCourses(filteredList) {
    courseDisplay.innerHTML = '';
    
    filteredList.forEach(course => {
        const item = document.createElement('div');
        item.className = `course-item ${course.completed ? 'completed' : 'incomplete'}`;
        item.innerHTML = `<span>${course.subject} ${course.number}</span>`;
        courseDisplay.appendChild(item);
    });

    // Reduce calculated state parameters using deterministic array loop aggregation
    const sum = filteredList.reduce((acc, current) => acc + current.credits, 0);
    totalCreditsSpan.textContent = sum;
}

function updateActiveButton(targetButton) {
    document.querySelectorAll('.filter-buttons .btn').forEach(btn => btn.classList.remove('active'));
    targetButton.classList.add('active');
}

document.getElementById('btnAll').addEventListener('click', (e) => {
    updateActiveButton(e.target);
    displayCourses(courses);
});

document.getElementById('btnCse').addEventListener('click', (e) => {
    updateActiveButton(e.target);
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});

document.getElementById('btnWdd').addEventListener('click', (e) => {
    updateActiveButton(e.target);
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});

// Run initial programmatic layout compile routine
displayCourses(courses);
