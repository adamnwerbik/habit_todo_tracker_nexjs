import React from "react";
import { MdOutlineAddTask } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col items-center">
      <h1>Your habits 🌱</h1>
      <button className="flex flex-row text-center justify-center items-center border-gray-200 border rounded-md bg-gray-200 px-2 shadow-sm hover:bg-gray-300">
        <MdOutlineAddTask /> <p className="ml-2">Add a habit!</p>
      </button>
      <ClipLoader color="#358960" />
    </div>
  );
};

export default Loading;
