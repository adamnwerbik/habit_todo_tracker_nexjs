import React from "react";
import { PiArrowBendLeftUpThin } from "react-icons/pi";

const HabitTooltip = () => {
  return (
    <div className="flex flex-row items-center ml-10">
      <PiArrowBendLeftUpThin size={30} />
      <p>Click on a habit name to view more details</p>
    </div>
  );
};

export default HabitTooltip;
