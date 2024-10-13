import React from "react";
import { GiNothingToSay } from "react-icons/gi";

export default function Empty() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <GiNothingToSay size={65} color="black" />
      <h1 className="text-center text-gray-500">
        {" "}
        No interview experiences available.
      </h1>
    </div>
  );
}
