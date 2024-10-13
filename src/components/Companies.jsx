import React from "react";
import PopularInterview from "./PopularInterview";

export default function Companies() {
  return (
    <>
      <img
        src="https://files.codingninjas.in/group-48095788-29192.svg"
        alt=""
        className="hidden pt-10 md:block"
      />
      <div className="flex flex-col items-start justify-between lg:-mt-36 md:flex-row">
        <PopularInterview />
      </div>
    </>
  );
}
