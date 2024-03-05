// Main Workout Clock
let timerInterval;
let s = 0;
let m = 0;
let h = 0;

function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
    // Currently broken, if pressed more than once time cant be stopped
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function stopTimer() {
    clearInterval(timerInterval);
    resetTimer();
}

function updateTimer() {
    s++;
    if (s == 60) {
        s = 0;
        m++;
        if (m == 60) {
            m = 0;
            h++;
        }
    }
    displayTimer();
}

function displayTimer() {
    const formattedTime = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
    document.querySelector("#time-elapsed").textContent = formattedTime;
}

function resetTimer() {
    s = 0;
    m = 0;
    h = 0;
    displayTimer();
}


// Workout form

document.addEventListener('DOMContentLoaded', function () {
    //  Global variable for workout data
    let workoutData = [];

    // Get form elements
    const workoutForm = document.querySelector('#workout-form');
    const activityNameInput = document.querySelector('#activity-name');
    const activityDescriptionInput = document.querySelector('#activity-description');
    const activityDurationInput = document.querySelector('#activity-duration');
    const addActivityButton = document.querySelector('#add-activity-btn');

    // Function to update activity list
    function updateActivityList() {
        const activityList = document.querySelector('#activity-list');
        activityList.innerHTML = ''; // Clear the list

        // Loop through workout data and create list items
        workoutData.forEach(function (activity, index) {
            const activityItem = document.createElement('li');
            activityItem.innerHTML = `${activity.name} (${activity.duration} seconds) <button class="remove-activity-btn" data-index="${index}">Remove</button>`;
            activityList.appendChild(activityItem);
        });

        // Add event listener to remove activity buttons
        const removeButtons = document.querySelectorAll('.remove-activity-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const indexToRemove = parseInt(this.getAttribute('data-index'), 10);
                workoutData.splice(indexToRemove, 1); // Remove the activity from the array
                updateActivityList(); // Update the displayed list
            });
        });
    }



    // Event listener for new activity
    addActivityButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Get input values from form
        const activityName = activityNameInput.value.trim();
        const activityDescription = activityDescriptionInput.value.trim();
        const activityDuration = parseInt(activityDurationInput.value, 10);

        if (!activityName || !activityDescription || isNaN(activityDuration) || activityDuration <= 0) {
            alert('Please fill in all the fields with valid values.');
            return;
        }

        const activity = {
            name: activityName,
            description: activityDescription,
            duration: activityDuration
        };

        // Add activity to workout data
        workoutData.push(activity);
        console.log(workoutData);

        // Clear form fields after pushed
        activityNameInput.value = '';
        activityDescriptionInput.value = '';
        activityDurationInput.value = '';

        updateActivityList();
    });

    updateActivityList();
});