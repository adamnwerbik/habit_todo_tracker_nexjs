import React, { Suspense } from "react";
import ActivityCalendar from "react-activity-calendar";
import HabitOverviewDashboard from "./components/HabitOverviewDashboard";
import ChecksPerms from "./components/ChecksPerms";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <>
      <HabitOverviewDashboard id={params.id} />
    </>
  );
};

export default page;
