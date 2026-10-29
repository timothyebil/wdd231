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
    
    const buttons = {
        all: document.getElementById("btnAll"),
        cse: document.getElementById("btnCse"),
        wdd: document.getElementById("btnWdd")
    };

    function displayCourses(filteredCourses) {
        if (!courseDisplay) return;
        
        // Clear active nodes completely
        courseDisplay.innerHTML = "";

        filteredCourses.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");
            
            // Explicit conditional layout state rendering parameters
            if (course.completed) {
                courseCard.classList.add("completed");
                courseCard.setAttribute("aria-label", `${course.subject} ${course.number} - Completed`);
            } else {
                courseCard.classList.add("incomplete");
                courseCard.setAttribute("aria-label", `${course.subject} ${course.number} - Incomplete`);
            }

            // Create structural inner details template strings securely
            courseCard.innerHTML = `
                <h3>${course.subject} ${course.number}</h3>
                <p class="course-title">${course.title}</p>
                <span class="credit-badge">${course.credits} Credits</span>
            `;
            
            courseDisplay.appendChild(courseCard);
        });

        // Compute active view cumulative credits using a safe reduce function loop array setup
        const totalCredits = filteredCourses.reduce((accumulator, currentCourse) => {
            return accumulator + currentCourse.credits;
        }, 0);
        
        if (totalCreditsSpan) {
            totalCreditsSpan.textContent = totalCredits;
        }
    }

    function toggleActiveState(activeButton) {
        Object.values(buttons).forEach(button => {
            if (button) button.classList.remove("active");
        });
        if (activeButton) activeButton.classList.add("active");
    }

    // Set up functional filter bindings defensively
    if (buttons.all) {
        buttons.all.addEventListener("click", () => {
            displayCourses(courses);
            toggleActiveState(buttons.all);
        });
    }

    if (buttons.cse) {
        buttons.cse.addEventListener("click", () => {
            const cseFilter = courses.filter(c => c.subject === "CSE");
            displayCourses(cseFilter);
            toggleActiveState(buttons.cse);
        });
    }

    if (buttons.wdd) {
        buttons.wdd.addEventListener("click", () => {
            const wddFilter = courses.filter(c => c.subject === "WDD");
            displayCourses(wddFilter);
            toggleActiveState(buttons.wdd);
        });
    }

    // Run programmatic initialization display sequence
    displayCourses(courses);
});
