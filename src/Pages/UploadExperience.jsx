import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "../components";

export default function UploadExperience() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [salaryRange, setSalaryRange] = useState("All");
  const [location, setLocation] = useState("All");
  const [journey, setJourney] = useState("");
  const [applicationStory, setApplicationStory] = useState("");
  const [interviewExperience, setInterviewExperience] = useState("");
  const [preparation, setPreparation] = useState("");
  const [tip, setTip] = useState("");

  const jwt = localStorage.getItem("jwt");

  const salaryRanges = [
    "SalaryRanges",
    "2 LPA to 5 LPA",
    "5 LPA to 8 LPA",
    "8 LPA to 12 LPA",
    "12 LPA to 20 LPA",
    "20 LPA and above",
  ];

  const locations = [
    "Locations",
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Gurgaon",
    "Noida",
    "Ahmedabad",
  ];

  const companies = [
    "Companies",
    "Tata Consultancy Services",
    "Infosys",
    "Wipro",
    "Cognizant",
    "Accenture",
    "HCL Technologies",
    "Tech Mahindra",
    "IBM",
    "Capgemini",
    "Mindtree",
  ];

  const handleSubmit = async () => {
    if (!jwt) {
      alert("JWT is missing!");
      return;
    }

    const interviewData = {
      company,
      role,
      salaryRange,
      location,
      journey,
      applicationStory,
      interviewExperience,
      preparation,
      tip,
    };

    try {
      const response = await axios.post(
        `http://localhost:9000/upload/interviewUpload/${jwt}`,
        { interview: interviewData }
      );
      alert(response.data);
    } catch (error) {
      console.error("Error uploading interview experience", error);
      alert("Failed to upload experience");
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto my-5">
        <div>
          <div className="grid grid-cols-2 gap-3 place-items-center">
            <div className="border-[1px] border-gray-200 rounded-lg py-2 text-center col-span-2 ">
              <select
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="outline-none px-3 md:w-[31vw] w-[91vw]"
              >
                {salaryRanges.map((range, index) => (
                  <option key={index} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <div className="border-[1px] border-gray-200 rounded-lg py-2 text-center col-span-2 md:w-[31vw] w-[91vw]">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="outline-none px-3 md:w-[31vw] w-[91vw]"
                >
                  {locations.map((loc, index) => (
                    <option key={index} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div className="border-[1px] my-5 border-gray-200 rounded-lg py-2 text-center col-span-2 md:w-[31vw] w-[91vw]">
                <select
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="outline-none px-3 md:w-[31vw] w-[91vw]"
                >
                  {companies.map((comp, index) => (
                    <option key={index} value={comp}>
                      {comp}
                    </option>
                  ))}
                </select>
              </div>
              <h1 className="font-semibold text-slate-800">Role</h1>
              <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border-[1px] border-gray-300 py-3 px-2 rounded-lg outline-none md:w-[31vw] w-[91vw] mt-5"
              />
            </div>
            <div className="col-span-2">
              <h1 className="font-semibold text-slate-800">Journey</h1>
              <textarea
                type="text"
                cols={60}
                rows={5}
                placeholder="Journey"
                value={journey}
                onChange={(e) => setJourney(e.target.value)}
                className="border-[1px] border-gray-300 py-3 px-2 rounded-lg outline-none mt-5"
              />
            </div>
            <div className="col-span-2">
              <h1 className="font-semibold text-slate-800">
                Application Story
              </h1>
              <textarea
                type="text"
                cols={60}
                rows={5}
                placeholder="Application story"
                value={applicationStory}
                onChange={(e) => setApplicationStory(e.target.value)}
                className="border-[1px] border-gray-300 py-3 px-2 rounded-lg outline-none mt-5"
              />
            </div>
            <div className="col-span-2">
              <h1 className="font-semibold text-slate-800">
                Interview Experience
              </h1>
              <textarea
                type="text"
                cols={60}
                rows={5}
                placeholder="Interview experience"
                value={interviewExperience}
                onChange={(e) => setInterviewExperience(e.target.value)}
                className="border-[1px] border-gray-300 py-3 px-2 rounded-lg outline-none mt-5"
              />
            </div>
            <div className="col-span-2">
              <h1 className="font-semibold text-slate-800">Preparation</h1>
              <textarea
                type="text"
                cols={60}
                rows={5}
                placeholder="Preparation"
                value={preparation}
                onChange={(e) => setPreparation(e.target.value)}
                className="border-[1px] border-gray-300 py-3 px-2 rounded-lg outline-none mt-5"
              />
            </div>
            <div className="col-span-2">
              <h1 className="font-semibold text-slate-800">Tip</h1>
              <textarea
                type="text"
                cols={60}
                rows={5}
                placeholder="Tip"
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                className="border-[1px] border-gray-300 py-3 px-2 rounded-lg outline-none mt-5"
              />
              <div className="mt-5">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white rounded-lg font-semibold w-full py-2.5"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
