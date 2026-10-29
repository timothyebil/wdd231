const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces development tools and basic logic rules using structured standard functional syntax.',
        completed: true // Mark true as you completed this course
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Creating properly designed document markup and structured visual layouts with CSS style implementations.',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Proven Programming Building Blocks',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Focuses on functional modular development components using robust testing architecture strategies.',
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 4,
        certificate: 'Web and Computer Programming',
        description: 'Introduces advanced object-oriented program structuring methods to maximize reusability elements.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Applies dynamic client execution mechanisms using optimized scripting methodologies.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development II',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Advanced responsive structures focusing on operational testing architectures and custom logic loops.',
        completed: false
    }
];

const courseDisplay = document.getElementById('courseDisplay');
const totalCreditsSpan = document.getElementById('totalCredits');

function displayCourses(filteredCourses) {
    courseDisplay.innerHTML = '';
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = `course-item ${course.completed ? 'completed' : 'incomplete'}`;
        card.innerHTML = `<span>${course.subject} ${course.number}</span>`;
        courseDisplay.appendChild(card);
    });

    // Reduce calculated state parameters smoothly matching runtime item requirements
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;
}

// Set up UI Filtering Listeners 
document.getElementById('btnAll').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses);
});

document.getElementById('btnCse').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(c => c.subject === 'CSE'));
});

document.getElementById('btnWdd').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(c => c.subject === 'WDD'));
});

function setActiveButton(activeBtn) {
    document.querySelectorAll('.filter-buttons .btn').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

// Initial structural execution render
displayCourses(courses);
