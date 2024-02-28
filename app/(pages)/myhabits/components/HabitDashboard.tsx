"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

import React from "react";
import HabitAdderForm from "./HabitAdderForm";
import { add } from "date-fns";
import { fetchAUsersHabitsSB } from "./serverFunctions";
import { HabitHeader, HabitRow } from "./HabitRow";
import useSWR from "swr";

const HabitDashboard = (props: any) => {
  // SB client and redirect if not logged in
  const supabase = createClient();
  const dateToday = add(new Date(), { days: -0 });

  // SWR Stuff
  async function fetcher(key: string) {
    let { data: habits, error } = await supabase
      .from("habits")
      .select("*")
      .eq("createdByUser", key);
    error ? console.log(error) : "";
    return habits;
  }
  const { data, error, isLoading } = useSWR(props.userID, fetcher);

  if (!isLoading) {
    return (
      <div>
        <div className="text-center flex flex-col items-center">
          <h1>Your habits</h1>
          <HabitAdderForm userID={props.userID} />
        </div>
        <br></br>
        <HabitHeader startingDate={dateToday} />
        {data
          ? data.map((h: any) => {
              return (
                <HabitRow
                  key={h.id}
                  startingDate={dateToday}
                  habitName={h.habitName}
                  habitID={h.id}
                  repeatsEveryXdays={h.repeatsEveryXdays}
                />
              );
            })
          : ""}
      </div>
    );
  } else {
    return "Loading...";
  }
};

export default HabitDashboard;
