"use client";
import React, { useState } from "react";
import ActivityCalendar from "react-activity-calendar";
import HabitStrength from "./HabitStrength";
import HabitStats from "./HabitStats";
import HabitActivityCalendar from "./HabitActivityCalendar";
import HabitInfoGreet from "./HabitInfoGreet";
import { getHabitNameOffID } from "./serverFns";
import { createClient } from "@/utils/supabase/client";

async function getNameFromHabitID(id: number) {
  const sb = createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  const { data, error } = await sb.from("habits").select("name").eq("id", id);
  return data;
}

const HabitOverviewDashboard = (props: { id: number }) => {
  return (
    <div className="border border-gray-400 rounded-md text-center max-w-sm md:max-w-[600px] lg:max-w-[800px]">
      <h1>Hi</h1>
      <div className="flex flex-row justify-between mx-8 md:mx-16 lg:mx-32">
        <HabitStrength />
        <div></div>
        <HabitStats />
      </div>
      <div className="flex flex-row justify-center pt-2">
        <HabitActivityCalendar />
      </div>
      <div>Edit or delete</div>
    </div>
  );
};

export default HabitOverviewDashboard;
