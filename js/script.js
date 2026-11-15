
// =====================================
// ACADEMIC PLANNER - ASSIGNMENT TRACKER
// =====================================

const assignmentForm = document.getElementById("assignment-form");

// Run only on the Academic Planner page.
if (assignmentForm) {
    const assignmentTitle = document.getElementById("assignment-title");
    const assignmentCourse = document.getElementById("assignment-course");
    const assignmentDeadline = document.getElementById("assignment-deadline");
    const assignmentList = document.getElementById("assignment-list");

    let assignments = [];

    try {
        assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    } catch (error) {
        assignments = [];
    }

    function saveAssignments() {
        localStorage.setItem("assignments", JSON.stringify(assignments));
    }

    function displayAssignments() {
        assignmentList.innerHTML = "";

        if (assignments.length === 0) {
            assignmentList.innerHTML = "<p>No assignments added yet.</p>";
            return;
        }

        assignments.forEach((assignment, index) => {
            const card = document.createElement("div");
            card.className = "assignment-item";

            const title = document.createElement("h4");
            title.textContent = assignment.title;

            const course = document.createElement("p");
            course.textContent = "Course: " + assignment.course;

            const deadline = document.createElement("p");
            deadline.textContent = "Deadline: " + assignment.deadline;

            const status = document.createElement("p");
            status.textContent = assignment.completed ? "Completed" : "Pending";

            const completeButton = document.createElement("button");
            completeButton.type = "button";
            completeButton.textContent = assignment.completed
                ? "Mark as Pending"
                : "Mark as Completed";

            completeButton.addEventListener("click", () => {
                assignments[index].completed = !assignments[index].completed;
                saveAssignments();
                displayAssignments();
            });

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", () => {
                assignments.splice(index, 1);
                saveAssignments();
                displayAssignments();
            });

            card.append(title, course, deadline, status, completeButton, deleteButton);
            assignmentList.appendChild(card);
        });
    }

    assignmentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const newAssignment = {
            title: assignmentTitle.value.trim(),
            course: assignmentCourse.value.trim(),
            deadline: assignmentDeadline.value,
            completed: false
        };

        assignments.push(newAssignment);
        saveAssignments();
        displayAssignments();
        assignmentForm.reset();
    });

    displayAssignments();
}
