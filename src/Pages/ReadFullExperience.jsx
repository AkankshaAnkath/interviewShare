import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components";
import { BiLike } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import axios from "axios";

export default function ReadFullExperience() {
  const interviewData = useLocation();
  const [interview, setInterview] = useState(interviewData.state);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (interview?.upvotedBy?.includes(jwt)) {
      setHasUpvoted(true);
    }
  }, [interview?.upvotedBy, jwt]);

  const handleUpvote = async () => {
    if (hasUpvoted) return;

    try {
      const response = await axios.post(
        `http://localhost:9000/interviews/${jwt}/${interview._id}/upvote`
      );
      console.log(jwt, interview._id);
      setInterview(response.data);
      setHasUpvoted(true);
    } catch (error) {
      console.error("Error upvoting interview:", error);
    }
  };

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Navbar />
      <div className="max-w-md p-5 space-y-2 md:mx-40">
        <h1 className="text-2xl font-semibold">
          {interview.company} interview experience
        </h1>
        <p className="text-gray-500">
          Real-time questions & tips from candidates to crack your interview
        </p>
      </div>
      <div className="bg-white border-[1px] border-gray-300 p-5 rounded-lg mx-2 md:max-w-3xl md:mx-44">
        <div className="flex justify-end pt-3">
          {hasUpvoted ? (
            <AiFillLike size={24} className="text-blue-500 cursor-pointer" />
          ) : (
            <BiLike
              size={24}
              className="cursor-pointer"
              onClick={handleUpvote}
            />
          )}
          <span className="ml-2">{interview.upvotes}</span>
        </div>
        <div className="flex -mt-10 space-x-7">
          <div className="space-y-2">
            <h1 className="text-xl font-bold">{interview.position}</h1>
            <p className="font-semibold">{interview.company}</p>
            <p className="text-sm font-semibold text-gray-600">
              {interview.salaryRange} | {interview.location}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border-[1px] border-gray-300 p-5 md:max-w-3xl md:mx-44 mx-3 my-6 space-y-6">
        <div className="space-y-3">
          <h1 className="text-lg font-semibold">Journey</h1>
          <p className="text-sm text-gray-500">{interview.experience}</p>
        </div>
        <div className="space-y-3">
          <h1 className="text-lg font-semibold">Application story</h1>
          <p className="text-sm text-gray-500">
            {interview.applicationStory || "No application story provided."}
          </p>
        </div>
        <div className="space-y-3">
          <h1 className="text-lg font-semibold">
            Why selected/rejected for the role?
          </h1>
          <p className="text-sm text-gray-500">
            {interview.selectionReason || "No reason provided."}
          </p>
        </div>
        <div className="space-y-3">
          <h1 className="text-lg font-semibold">Preparation</h1>
          <p className="text-sm text-gray-500">
            {interview.preparation || "No preparation details provided."}
          </p>
        </div>
        <div className="space-y-3">
          <h1 className="text-lg font-semibold">Tip</h1>
          <p className="text-sm text-gray-500">
            {interview.tip || "No tips provided."}
          </p>
        </div>
      </div>
    </div>
  );
}
