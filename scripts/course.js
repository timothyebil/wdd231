const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces development using basic structures, conditional testing logic, and simple loops.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces designing web page architectures using valid semantic HTML elements and CSS layouts.',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course covers encapsulation, inheritance structures, and abstract programming patterns using modern languages.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Visualizations',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course focuses on dynamic server interaction models, multi-viewport styling grids, and data payloads.',
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development II',
        credits: 3,
        certificate: 'Web Frontend Development',
        description: 'Advanced production focuses targeting modular architecture modules, external API fetches, and validation parameters.',
        completed: false
    },
    {
        subject: 'CSE',
        number: 310,
        title: 'Applied Programming Patterns',
        credits: 3,
        certificate: 'Web and Computer Programming',
        description: 'Structural architecture implementation centering on security protocols and engineering workflow parameters.',
        completed: false
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const courseDisplay = document.getElementById("courseDisplay");
    const totalCreditsSpan = document.getElementById("totalCredits");
    const btnAll = document.getElementById("btnAll");
    const btnCse = document.getElementById("btnCse");
    const btnWdd = document.getElementById("btnWdd");

    function displayCourses(filteredCourses) {
        if (!courseDisplay) return;
        courseDisplay.innerHTML = "";

        filteredCourses.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");
            courseCard.classList.add(course.completed ? "completed" : "incomplete");

            courseCard.innerHTML = `
                <h3>${course.subject} ${course.number}</h3>
                <p class="course-title">${course.title}</p>
            `;
            courseDisplay.appendChild(courseCard);
        });

        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        if (totalCreditsSpan) {
            totalCreditsSpan.textContent = totalCredits;
        }
    }

    function updateActiveButton(activeBtn) {
        [btnAll, btnCse, btnWdd].forEach(btn => btn?.classList.remove("active"));
        activeBtn?.classList.add("active");
    }

    btnAll?.addEventListener("click", () => {
        displayCourses(courses);
        updateActiveButton(btnAll);
    });

    btnCse?.addEventListener("click", () => {
        displayCourses(courses.filter(c => c.subject === "CSE"));
        updateActiveButton(btnCse);
    });

    btnWdd?.addEventListener("click", () => {
        displayCourses(courses.filter(c => c.subject === "WDD"));
        updateActiveButton(btnWdd);
    });

    displayCourses(courses);
});
