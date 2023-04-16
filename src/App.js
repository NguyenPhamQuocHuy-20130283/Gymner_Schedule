import React, { useState, useEffect } from "react";
import { List } from "antd";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import "./styles.css";
const workouts = ["Chest", "Back", "Legs", "Shoulders", "Arms"];

const workoutsSlice = createSlice({
  name: "workouts",
  initialState: { data: workouts, status: "idle", error: null },
  reducers: {}
});

const store = configureStore({
  reducer: {
    workouts: workoutsSlice.reducer
  }
});

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
const restDay = "Rest Day";

function getRandomWorkout(workouts) {
  const index = Math.floor(Math.random() * workouts.length);
  return workouts[index];
}

function getWorkoutSchedule(workouts) {
  const schedule = [...weekdays];
  const randomWorkouts = [...workouts];
  let workoutIndex = 0;
  for (let i = 0; i < weekdays.length; i++) {
    if (i === 2 || i === 5) {
      schedule[i] += ` - ${restDay}`;
    } else {
      schedule[i] += ` - ${getRandomWorkout(randomWorkouts)}`;
      workoutIndex++;
      if (workoutIndex === 3) {
        randomWorkouts.splice(
          randomWorkouts.indexOf(schedule[i].split(" - ")[1]),
          1
        );
        workoutIndex = 0;
      }
    }
  }
  return schedule;
}

function App() {
  const [workouts, setWorkouts] = useState(store.getState().workouts.data);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setWorkouts(store.getState().workouts.data);
    });
    return unsubscribe;
  }, []);

  const workoutSchedule = getWorkoutSchedule(workouts);

  return (
    <div>
      <h1>Gym Workout Schedule</h1>
      <List
        bordered
        dataSource={workoutSchedule}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </div>
  );
}

export default App;
