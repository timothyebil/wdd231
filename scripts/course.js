const courses = [
    { subject: 'CSE', number: 110, title: 'Introduction to Programming', credits: 2, completed: true },
    { subject: 'WDD', number: 130, title: 'Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 111, title: 'Programming with Functions', credits: 2, completed: true },
    { subject: 'WDD', number: 131, title: 'Dynamic Web Fundamentals', credits: 2, completed: true },
    { subject: 'CSE', number: 210, title: 'Programming with Classes', credits: 2, completed: true },
    { subject: 'WDD', number: 231, title: 'Web Frontend Development II', credits: 3, completed: false }
];

function displayCourses(filterList) {
    const displayContainer = document.getElementById("courseDisplay");
    displayContainer.innerHTML = "";

    filterList.forEach(course => {
        const card = document.createElement("div");
        card.className = `course-card ${course.completed ? 'completed' : 'pending'}`;
        card.innerHTML = `<h3>${course.subject} ${course.number}</h3><p>${course.title}</p><p>Credits: ${course.credits}</p>`;
        displayContainer.appendChild(card);
    });

    const totalCredits = filterList.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById("totalCredits").textContent = totalCredits;
}

document.addEventListener("DOMContentLoaded", () => {
    displayCourses(courses);

    const btnAll = document.getElementById("btnAll");
    const btnCse = document.getElementById("btnCse");
    const btnWdd = document.getElementById("btnWdd");

    function clearActive() {
        [btnAll, btnCse, btnWdd].forEach(btn => btn.classList.remove("active"));
    }

    btnAll.addEventListener("click", () => { clearActive(); btnAll.classList.add("active"); displayCourses(courses); });
    btnCse.addEventListener("click", () => { clearActive(); btnCse.classList.add("active"); displayCourses(courses.filter(c => c.subject === 'CSE')); });
    btnWdd.addEventListener("click", () => { clearActive(); btnWdd.classList.add("active"); displayCourses(courses.filter(c => c.subject === 'WDD')); });
});
