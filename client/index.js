// Main Workout Clock
let timerInterval = null;
let s = 0;
let m = 0;
let h = 0;


function startTimer() {
    if (timerInterval === null) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
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
    timerInterval = null;
}



// Workout form

document.addEventListener('DOMContentLoaded', function () {
    // LOOK AT REMOVING THIS AND INSTEAD ACCESSING THE ELEMENTS WHEN NEEDED IN SEPERATE FUNCTIONS


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
                console.log('Clicked on workout:', workout);
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
    };

    // Function to show edit workout modal
    function showEditWorkoutModal(index) {
        const workout = savedWorkouts[index];
        console.log('Editing workout:', workout);
    }

    updateActivityList();
    updateSavedWorkoutsList();
});