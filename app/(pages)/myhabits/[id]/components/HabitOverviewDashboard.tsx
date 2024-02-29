import React from "react";
import ActivityCalendar from "react-activity-calendar";

const HabitOverviewDashboard = (props: { id: number }) => {
  return (
    <div className="border border-gray-400 rounded-md text-center">
      <h1>Info about your habit with ID {props.id}</h1>

      <p>Score</p>
      <p>Total entries</p>
      <p>Total days covered</p>
      <p>Longest streak</p>
      <p>Calendar github commit style?</p>
      <p>Options to delete/Edit?</p>
      <div className="max-w-md">
        <ActivityCalendar
          weekStart={1}
          maxLevel={2}
          hideColorLegend={true}
          hideTotalCount={false}
          showWeekdayLabels={true}
          data={[
            { date: "2024-01-01", count: 1, level: 1 },
            { date: "2024-03-20", count: 1, level: 1 },

            { date: "2024-12-31", count: 1, level: 1 },
          ]}
          theme={{
            light: ["hsl(0, 0%, 92%)", "firebrick"],
            dark: ["#333", "rgb(214, 16, 174)"],
          }}
        />
      </div>
    </div>
  );
};

export default HabitOverviewDashboard;
