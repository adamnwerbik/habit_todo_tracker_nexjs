import { getHabitNameOffID } from "./serverFns";

const HabitInfoGreet = async (props: any) => {
  const habitName = await getHabitNameOffID(props.id);
  return habitName ? "lalala" : "";
};

export default HabitInfoGreet;
