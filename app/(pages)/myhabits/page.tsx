import React from "react";
import HabitDashboard from "./components/HabitDashboard";

const page = () => {
  return (
    <div className="flex flex-col text-center items-center">
      <h1>Your habits 🌱</h1>
      <HabitDashboard startingDate={new Date()} />
    </div>
  );
};

export default page;
