import React from "react";
import ActivityCalendar from "react-activity-calendar";
import HabitOverviewDashboard from "./components/HabitOverviewDashboard";

const page = ({ params }: { params: { id: number } }) => {
  return <HabitOverviewDashboard id={params.id} />;
};

export default page;
