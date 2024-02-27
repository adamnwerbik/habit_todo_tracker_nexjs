import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { GoStar, GoStarFill } from "react-icons/go";

function TodoCard(props: any) {
  const today = new Date();
  const date = today.getDate();
  return (
    <div className="overflow-hidden max-w-sm min-w-96 min-h-16 m-2 flex flex-row bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="bg-white w-2/12 items-center flex justify-center">
        <RiCheckboxBlankCircleLine
          onClick={(e) => {
            console.log("COMP");
          }}
        />
      </div>
      <div className="bg-white w-8/12 flex flex-col text-center justify-center">
        <h3 className="font-medium">{props.data.name}</h3>
        <p className="italic">{props.data.details}</p>
        <p>
          {props.data.due_date
            ? props.data.due_time
              ? `Due on ${props.data.due_date} at ${props.data.due_time}`
              : `Due on ${props.data.due_date}`
            : ""}
        </p>
      </div>
      <div className="bg-white w-2/12 items-center flex flex-col justify-center">
        {props.data.is_starred ? (
          <GoStarFill
            className="m-auto"
            fill="orange"
            onClick={(e) => {
              console.log("STARFULL");
            }}
          />
        ) : (
          <GoStar
            className="m-auto"
            onClick={(e) => {
              console.log("STAR");
            }}
          />
        )}
        <AiOutlineDelete
          className="m-auto"
          onClick={(e) => {
            console.log("BIN");
          }}
        />
      </div>
    </div>
  );
}

export default TodoCard;
