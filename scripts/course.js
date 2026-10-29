// Course array data source schema
const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 3, completed: true },
    { subject: 'WDD', number: 131, title: 'Web Frontend Development I', credits: 3, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 3, completed: false },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 3, completed: false }
];

document.addEventListener("DOMContentLoaded", () => {
    const courseDisplay = document.querySelector("#courseDisplay");
    const totalCreditsSpan = document.querySelector("#totalCredits");
    const buttons = document.querySelectorAll(".filter-buttons .btn");

    // Function to render filtered course array objects into the display area
    function displayCourses(filteredCourses) {
        courseDisplay.innerHTML = "";
        
        filteredCourses.forEach(course => {
            const courseCard = document.createElement("div");
            
            // Apply semantic separation styles
            const completionClass = course.completed ? "completed" : "incomplete";
            courseCard.className = `course-card ${course.subject.toLowerCase()} ${completionClass}`;
            
            courseCard.innerHTML = `<strong>${course.subject} ${course.number}</strong><br><small>${course.title}</small>`;
            courseDisplay.appendChild(courseCard);
        });

        // Compute aggregated total matching credits dynamically using reduce
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsSpan.textContent = totalCredits;
    }

    // Setup interactive filtering event handlers for your filter buttons
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            // Manage UI active indicator state
            buttons.forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");

            // Filter data array based on button element target selection
            const filterValue = e.target.id;
            let targetCourses = courses;

            if (filterValue === "btnCse") {
                targetCourses = courses.filter(c => c.subject === "CSE");
            } else if (filterValue === "btnWdd") {
                targetCourses = courses.filter(c => c.subject === "WDD");
            }

            displayCourses(targetCourses);
        });
    });

    // Default structural initial render execution pass
    displayCourses(courses);
});
