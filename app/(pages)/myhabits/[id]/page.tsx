import React from "react";

const page = ({ params }: { params: { id: number } }) => {
  return (
    <div>
      <h1>Info about your habit with ID {params.id}</h1>
      <p>Overview</p>
      <p>Score</p>
      <p>Total entries</p>
      <p>Total days covered</p>
      <p>Longest streak</p>
      <p>Calendar github commit style?</p>
      <p>Options to delete/Edit?</p>
    </div>
  );
};

export default page;
