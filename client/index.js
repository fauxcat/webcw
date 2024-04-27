// Timer Variables
let mainTimerInterval = null;
let s = 0;
let m = 0;
let h = 0;
let activityTimerInterval = null;
let currentActivityIndex = 0;
let isResting = false;
let restDuration = 3;

// Button functions

function startTimers() {
    if (workoutData.length === 0) {
        displayActivityTimer('Nothing', 'Create or Load a workout to get started!', 0);
        return;
    }

    activityTimer();
    startMainTimer();
    startActivityTimer();
}

function pauseTimers() {
    pauseMainTimer();
    pauseActivityTimer();
}

function stopTimers() {
    stopMainTimer();
    stopActivityTimer();
    displayMainTimer();
    displayActivityTimer('Nothing', 'Create or Load a workout to get started!', 0);
}


// Main Workout Clock

function startMainTimer() {
    if (mainTimerInterval === null) {
        mainTimerInterval = setInterval(updateMainTimer, 1000);
    }
}

function pauseMainTimer() {
    clearInterval(mainTimerInterval);
    mainTimerInterval = null;
}

function stopMainTimer() {
    clearInterval(mainTimerInterval);
    resetMainTimer();
}

function updateMainTimer() {
    s++;
    if (s == 60) {
        s = 0;
        m++;
        if (m == 60) {
            m = 0;
            h++;
        }
    }
    displayMainTimer();
}

function displayMainTimer() {
    const formattedTime = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
    document.querySelector("#time-elapsed").textContent = formattedTime;
}

function resetMainTimer() {
    s = 0;
    m = 0;
    h = 0;
    displayMainTimer();
    mainTimerInterval = null;
}

// Activity Timer

function startActivityTimer() {
    activityTimerInterval = setInterval(updateActivityTimer, 1000);
}

function pauseActivityTimer() {
    clearInterval(activityTimerInterval);
}

function stopActivityTimer() {
    clearInterval(activityTimerInterval);
    resetActivityTimer();
}

function updateActivityTimer() {
    if (isResting) {
        restTimer();
    } else {
        activityTimer();
    }
    
}

function activityTimer() {
    const currentActivity = workoutData[currentActivityIndex];

    if (currentActivity) {
        if (currentActivity.duration > 0) {
            displayActivityTimer(currentActivity.name, currentActivity.description, currentActivity.duration);
            currentActivity.duration--;
        } else {
            // Rest before next activity
            currentActivityIndex++;
            isResting = true;
            displayActivityTimer('Rest', 'Take a break', restDuration);
        }
    } else {
        // Workout complete
        console.log("Workout complete");
        clearInterval(activityTimerInterval);
        pauseMainTimer();
        resetActivityTimer();
        displayActivityTimer('Workout Complete', 'Well done!', 0);
    }
}

function restTimer() {
    if (restDuration > 0) {
        restDuration--; // Decrement restDuration
        displayActivityTimer('Rest', 'Take a break', restDuration);
    } else {
        isResting = false;
        restDuration = 5; // Reset restDuration to its initial value
        if (currentActivityIndex < workoutData.length) {
            activityTimer();
        }
    }
}

function displayActivityTimer(name, description, duration) {
    const formattedTime = formatTime(duration);
    document.querySelector("#current-activity").textContent = name;
    document.querySelector("#time-remaining").textContent = formattedTime;
    document.querySelector("#instructions").textContent = description;
}

function resetActivityTimer() {
    currentActivityIndex = 0;
    isResting = false;
    displayActivityTimer('', '', 0);
}

function formatTime(secs) {
    const formattedSecs = secs % 60;
    const formattedMins = Math.floor(secs / 60);
    return `${formattedMins < 10 ? "0" + formattedMins : formattedMins}:${formattedSecs < 10 ? "0" + formattedSecs : formattedSecs}`;
}

// Workout form


//  Global variable for workout data
let workoutData = [];

// Global varaible for saved workouts
let savedWorkouts = [];

// Get form elements
const workoutForm = document.querySelector('#workout-form');
const activityNameInput = document.querySelector('#activity-name');
const activityDescriptionInput = document.querySelector('#activity-description');
const activityDurationInput = document.querySelector('#activity-duration');
const addActivityButton = document.querySelector('#add-activity-btn');
const savedWorkoutsList = document.querySelector('#saved-workouts-list');

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

function loadSavedWorkout(workout) {

    workoutData = [...workout.activities];
    updateActivityList();

    // Load workout into timer
    if (workoutData.length > 0) {
        displayActivityTimer(workoutData[0].name, workoutData[0].description, workoutData[0].duration);
    }

}

// Function to update saved workouts list
function updateSavedWorkoutsList() {

    savedWorkoutsList.innerHTML = ''; // Clear the list

    // Buttons and event listeners for each workout
    savedWorkouts.forEach(function (workout, index) {
        const workoutItem = document.createElement('li');
        const workoutButton = document.createElement('button');
        workoutButton.textContent = workout.name;
        workoutButton.classList.add('saved-workout-btn');
        workoutButton.addEventListener('click', function () {
            // Handle click on saved workout button - load workout to current activity or smth
            loadSavedWorkout(workout);
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-workout-btn');
        removeButton.addEventListener('click', function () {
            const indexToRemove = parseInt(this.getAttribute('data-index'), 10);
            savedWorkouts.splice(indexToRemove, 1); // Remove the workout from the array
            updateSavedWorkoutsList(); // Update the displayed list
        });

        workoutItem.appendChild(workoutButton);
        workoutItem.appendChild(removeButton);
        workoutItem.classList.add('saved-workout-item');
        workoutItem.setAttribute('data-index', index);
        savedWorkoutsList.appendChild(workoutItem);
    });

}

// Function to create/save new workout
window.createNewWorkout = function () {
    const newWorkout = {
        name: prompt('Enter a name for the workout:'),
        activities: [...workoutData],
    };

    // Clear current list of activies once workout is saved
    workoutData = [];
    updateActivityList();

    savedWorkouts.push(newWorkout);
    updateSavedWorkoutsList();

    // Load the first activity into the timer
    if (newWorkout.activities.length > 0) {
        displayActivity(newWorkout.activities[0]);
    }
};

// Function to show edit workout modal
function showEditWorkoutModal(index) {
    const workout = savedWorkouts[index];
    console.log('Editing workout:', workout);
}

updateActivityList();
updateSavedWorkoutsList();