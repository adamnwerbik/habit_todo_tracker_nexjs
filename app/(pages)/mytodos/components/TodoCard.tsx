import React from "react";

function TodoCard(props: any) {
  return (
    <div className="block max-w-sm m-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="text-center break-words text-lg  tracking-tight text-gray-900 dark:text-white">
        {props.data.is_starred ? "⭐" : ""}
        {props.data.name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 break-words italic ">
        {props.data.details}
      </p>
      <p className="text-center">
        {props.data.due_date
          ? props.data.due_time
            ? `Due on ${props.data.due_date} at ${props.data.due_time}`
            : `Due on ${props.data.due_date}`
          : ""}
      </p>
    </div>
  );
}

export default TodoCard;
