import React, { useEffect, useState } from "react";
import Empty from "./Empty";
import { Link } from "react-router-dom";

export default function PopularInterview() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:9000/interviews/trending"
        );
        const result = await response.json();
        const filteredInterviews = result.filter(
          (interview) => interview.upvotes >= 5
        );
        console.log(filteredInterviews);
        setInterviews(filteredInterviews);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="md:w-[50vw] mt-10 mx-auto">
        <div className="px-3.5 space-y-2 w-96 -ml-28 md:ml-0">
          <h1 className="text-lg font-semibold lg:text-2xl md:text-xl text-slate-800">
            Popular Experiences
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 mt-5 ">
          {interviews.length > 0 ? (
            interviews.map((i, idx) => (
              <Link
                to={`/interview/${i._id}`}
                state={{
                  company: i.company,
                  role: i.role,
                  salaryRange: i.salaryRange,
                  location: i.location,
                  journey: i.journey,
                  applicationStory: i.applicationStory,
                  interviewExperience: i.interviewExperience,
                  preparation: i.preparation,
                  tip: i.tip,
                  Likes: i.Likes,
                  upvotes: i.upvotes,
                  upvotedBy: i.upvotedBy,
                  profilePic: i.ProfilePic,
                  interviewPlace: i.interviewPlace,
                  collage: i.collage,
                  _id: i._id,
                }}
                className="w-[80vw] md:w-[50vw] lg:w-[40vw] mx-auto p-5 border-[1px] border-gray-300 rounded-lg cursor-pointer"
              >
                <div key={idx}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold">
                      {i.company} | {i.role}
                    </h1>
                  </div>
                  <div className="mt-3">
                    <div className="space-y-1">
                      <h1 className="">Upvotes : {i.upvotes} |</h1>
                      <h1>Location: {i.location} |</h1>
                      <h1> Collage : {i.college} |</h1>
                      <h1> SalaryRange: {i.salaryRange}</h1>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </>
  );
}
