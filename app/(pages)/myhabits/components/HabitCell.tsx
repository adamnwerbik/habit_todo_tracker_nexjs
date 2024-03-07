import { ImCheckmark } from "react-icons/im";
import { addAHabitDoLog } from "./ServerFns";
import useSWR, { useSWRConfig } from "swr";

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
