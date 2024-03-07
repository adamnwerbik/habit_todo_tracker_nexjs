import { add, format, parse } from "date-fns";
import Link from "next/link";
import { Habit, fetcherHabitDoLog } from "./ServerFns";
import useSWR from "swr";
import { HabitCell } from "./HabitCell";

export function HabitRow(props: { habitData: Habit; startingDate: Date }) {
  const datesOffsets = [6, 5, 4, 3, 2, 1, 0];
  const { data, error, isLoading } = useSWR(
    `${props.habitData.id}`,
    fetcherHabitDoLog
  );

  if (isLoading) {
    <div className="flex flex-col">
      <div className="flex flex-row ">
        <div className="w-24 bg-gray-300 justify-center text-center border-gray-400 border ">
          {props.habitData.habitName}
        </div>
      </div>
    </div>;
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
