"use client";
import React from "react";
import ActivityCalendar, { Activity } from "react-activity-calendar";

export default function ActivityCal(props: { dates: Activity[] }) {
  try {
    return (
      <ActivityCalendar
        weekStart={1}
        maxLevel={2}
        hideColorLegend={true}
        hideTotalCount={false}
        showWeekdayLabels={true}
        data={props.dates}
        theme={{
          light: ["hsl(0, 0%, 92%)", "rgb(53,137,96)"],
          dark: ["#333", "rgb(214, 16, 174)"],
        }}
      />
    );
  } catch (error) {
    console.log(error);
  }
}
