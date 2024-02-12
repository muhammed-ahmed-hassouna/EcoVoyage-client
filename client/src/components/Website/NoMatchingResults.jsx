import React from "react";

function NoMatchingResults() {
  return (
    <div className="md:w-full flex flex-col justify-center items-center mt-7">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3771/3771554.png"
        alt="no Results"
        className="w-28 h-auto"
      />
      <h1 className="text-xl text-fourth-color">No matching results</h1>
    </div>
  );
}

export default NoMatchingResults;
