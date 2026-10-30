const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Visualizations',
        credits: 2,
        certificate: 'Web and Computer Programming',
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development II',
        credits: 3,
        certificate: 'Web Frontend Development',
        completed: false
    },
    {
        subject: 'CSE',
        number: 310,
        title: 'Applied Programming Patterns',
        credits: 3,
        certificate: 'Web and Computer Programming',
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
