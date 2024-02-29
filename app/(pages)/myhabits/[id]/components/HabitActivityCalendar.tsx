import React from "react";
import ActivityCalendar from "react-activity-calendar";

const HabitActivityCalendar = () => {
  return (
    <div className="overflow-scroll" style={{ scrollbarWidth: "none" }}>
      <ActivityCalendar
        weekStart={1}
        maxLevel={2}
        hideColorLegend={true}
        hideTotalCount={false}
        showWeekdayLabels={true}
        data={[
          { date: "2024-01-01", count: 1, level: 1 },
          { date: "2024-03-20", count: 1, level: 1 },

          { date: "2024-03-31", count: 1, level: 1 },
        ]}
        theme={{
          light: ["hsl(0, 0%, 92%)", "firebrick"],
          dark: ["#333", "rgb(214, 16, 174)"],
        }}
      />
    </div>
  );
};

export default HabitActivityCalendar;
