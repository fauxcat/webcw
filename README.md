# web-coursework
 
This website is a HIIT workout app.

## Installation Guide 

Navigate inside the folder of this application with:
```
cd testcw
```
Next, install the required dependencies with:
```
npm i
```
Finally, start the server with:
```
npm run start
```
Now the application can be accessed by visiting:
[localhost:8080](localhost:8080)

## Key Features

### Build a custom HIIT workout from scratch
Using the provided "Workout Settings" form, you can add any activity you want to a fully customisable workout.  
  
Workouts can be saved and accessed at any time.

Every saved workout has a "remove" button that can be used to delete it.

### Create multiple activities

This includes an activity name, description and duration.  
   
Once an activity is created, it is added to a list for the current workout you are creating.  
  
Multiple activities can be added to and removed from the current workout at any time before saving.

Once you have added the right activities to your workout, you can save the workout.

### Start, stop and pause workouts
A provided timer is comes with three buttons that allow the workout duration to be tracked.  
  
The "start" button is used to begin the count-up timer.  
  
The "pause" button pauses the timer at its current time and can be continued by pressing the "start" button again.  
  
The "stop" button clears the timer, resetting it to 0 and allowing it to be started again.

### Use of A.I.

#### PROMPT

I will now provide a list of prompts I used with ChatGPT3.5 that provided the inspiration for some aspects of my submission.


```
i am designing a hiit workout webapp that allows a user to create custom hiit workouts from scratch. a workout is composed of multiple exercises, each of which having a name, description and duration. the user should be able to start, stop and pause workouts. explain to me how i should design a timer for the application. should i have one long count up for the entire workout, or maybe an individual countdown for each exercises, or even one countdown per exercise and another coundown for rest periods; which idea sounds most effective?
```

I began by asking about how I should keep the time for the workouts by providing some options. The response to this was a list of advantages and disadvantages for each approach.  
  
I decided in the end to opt for having a total countup timer along with a countdown timer for each individual stage of the workout because it provides a clear HIIT structure and can be beneficial when developing more complex features that may require one or both approaches, such as viewing past works.
  

#### PROMPT  
After inputting the provided coursework specification, I asked for:
```
create an outline for how i should structure my application, what specific buttons, pages, features, functions, etc. and how should i order them - what is best to code first and how, etc.
```
I received a simple local server and client project along with a guide to creating a skeleton web application. Finally the A.I. managed to elaborate on some of the "core features" and suggest introductory steps. For example:  
  
- "Add a form to create a custom HIIT workout."  
- "Input fields for activity name, description, and duration"  
- "Add buttons for adding activities."
  
While these are quite basic steps, they helped me to create my initial design and develop a strong foundation to build up from.
