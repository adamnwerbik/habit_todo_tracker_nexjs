import React from "react";
import { BarLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <h1>Your habit</h1>
      <div className="mt-5">
        <BarLoader color="#36d7b7" />
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
