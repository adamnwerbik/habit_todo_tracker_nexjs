"use client";
import { add, format, parse } from "date-fns";
import React from "react";
import HabitAdderForm from "./HabitAdderForm";
import useSWR, { useSWRConfig } from "swr";
import { Habit, addAHabitDoLog, fetcher, fetcherHabitDoLog } from "./ServerFns";
import Link from "next/link";
import { BarLoader } from "react-spinners";
import { ImCheckmark } from "react-icons/im";

export const HeaderRow = (props: { startingDate: Date }) => {
  const dates = [];
  for (let i = 6; i > -1; i--) {
    dates.push(add(props.startingDate, { days: -i }));
  }
  return (
    <div className="flex flex-col mt-2">
      <div className="flex flex-row ">
        <div className="w-24 justify-center text-center bg-gray-300 border-gray-400 border">
          Habit Name
        </div>
        <div className="w-72 md:w-[500px] lg:w-[700px] xl:w-[750px] bg-gray-300 flex flex-row">
          {dates.map((d) => {
            return (
              <div
                className="w-[100%] text-center border border-gray-400"
                data-day={d}
                key={`header-${d}`}
              >
                {format(d, "EEE MMM dd")}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const HabitCell = (props: {
  dateForCell: string;
  habitID: number;
  covered: boolean;
  checked: boolean;
}) => {
  function getBackGroundColour() {
    return props.covered ? "#90EE90" : "#FFFFFF";
  }
  const { mutate } = useSWRConfig();
  const { data } = useSWR(`${props.habitID}`);
  return (
    <div
      style={{ backgroundColor: getBackGroundColour() }}
      className="w-[100%] min-w-[1/7] text-center border border-gray-400 justify-evenly flex flex-col items-center"
      data-day={props.dateForCell}
      onClick={async (e) => {
        console.log(
          `${e.currentTarget.getAttribute("data-day")} for habitID ${
            props.habitID
          } `
        );
        try {
          //deleting it -RE problem with dates and coverage?
          if (props.checked) {
            await mutate(
              `${props.habitID}`,
              addAHabitDoLog(props.habitID, props.dateForCell, props.checked),
              {
                optimisticData: data.filter((e: any) => {
                  return !(e.dateDone === props.dateForCell);
                }),
                rollbackOnError: true,
                populateCache: true,
                revalidate: false,
              }
            );
          } else {
            //adding it
            await mutate(
              `${props.habitID}`,
              addAHabitDoLog(props.habitID, props.dateForCell, props.checked),
              {
                optimisticData: [
                  ...data,
                  { habitDoneFK: props.habitID, dateDone: props.dateForCell },
                ],
                rollbackOnError: true,
                populateCache: true,
                revalidate: false,
              }
            );
          }

          //toast.success("Successfully added!");
        } catch (error) {
          //toast.error("Error adding habit. Please try again.");
          //console.log(error);
        }

        //setCheckedOff((prev) => !prev);
      }}
    >
      {props.checked ? <ImCheckmark /> : " "}
    </div>
  );
};

export function HabitRow(props: { habitData: Habit; startingDate: Date }) {
  const datesOffsets = [6, 5, 4, 3, 2, 1, 0];
  const { data, error, isLoading } = useSWR(
    `${props.habitData.id}`,
    fetcherHabitDoLog
  );

  if (isLoading) {
    return;
  }

  const datesDonesYYYYMMDD: string[] = [];
  data?.map((i) => datesDonesYYYYMMDD.push(i.dateDone));

  return (
    <div className="flex flex-col">
      <div className="flex flex-row ">
        <div className="w-24 bg-gray-300 justify-center text-center border-gray-400 border ">
          <Link href={`/myhabits/${props.habitData.id}`}>
            {props.habitData.habitName}
          </Link>
        </div>
        <div className="w-72 md:w-[500px] lg:w-[700px] xl:w-[750px] bg-gray-200 flex flex-row rounded-sm">
          {datesOffsets.map((d) => {
            let date = format(
              add(props.startingDate, { days: -d }),
              "yyyy-MM-dd"
            );
            //console.log(date);
            var checked = false;
            if (datesDonesYYYYMMDD.includes(date)) {
              var checked = true;
            }

            const datesCovered: any[] = [];
            datesDonesYYYYMMDD.map((dateDone) => {
              for (let i = 0; i < props.habitData.repeatsEveryXdays; i++) {
                try {
                  datesCovered.push(
                    format(
                      add(parse(dateDone, "yyyy-MM-dd", new Date()), {
                        days: i,
                      }),
                      "yyyy-MM-dd"
                    )
                  );
                } catch {}
              }
            });

            return (
              <HabitCell
                dateForCell={date}
                habitID={props.habitData.id ? props.habitData.id : -1}
                checked={checked}
                covered={datesCovered.includes(date) ? true : false}
                key={`${props.habitData.id}_${date}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function HabitDashboard(props: { startingDate: Date }) {
  const { data, isLoading, error } = useSWR("userHabits", fetcher);
  if (isLoading) {
    return (
      <div className="min-w-96 flex flex-col items-center text-center">
        <HabitAdderForm />
        <HeaderRow startingDate={new Date()} />
        <div className="mt-5">
          <BarLoader color="#36d7b7" />
        </div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="min-w-96 flex flex-col items-center text-center">
      <HabitAdderForm />
      <HeaderRow startingDate={props.startingDate} />
      {data.map((e: Habit) => (
        <HabitRow habitData={e} startingDate={props.startingDate} key={e.id} />
      ))}
      {data ? (
        <div>Tip: Click on a habit name to view stats and other info!</div>
      ) : (
        ""
      )}
    </div>
  );
}
