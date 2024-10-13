import React, { useEffect, useState } from "react";
import axios from "axios";
import Empty from "./Empty";
import Loader from "./Loader";
import { Link } from "react-router-dom";

export default function TrendingExperience() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSalary, setSelectedSalary] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const itemsPerPage = 7;

  const salaryRanges = [
    "All",
    "2 LPA to 5 LPA",
    "5 LPA to 8 LPA",
    "8 LPA to 12 LPA",
    "12 LPA to 20 LPA",
    "20 LPA and above",
  ];

  const locations = [
    "All",
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

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const loaderTimeout = setTimeout(() => {
          setShowLoader(true);
        }, 1000);

        const response = await axios.get(
          "http://localhost:9000/interviews/trending"
        );
        setData(response.data);

        clearTimeout(loaderTimeout);
      } catch (error) {
        console.error("Error fetching the interviews:", error);
      } finally {
        setShowLoader(false);
      }
    };

    fetchInterviews();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filtered = [...data];

      if (selectedSalary !== "All") {
        filtered = filtered.filter((item) => item.salary === selectedSalary);
      }

      if (selectedLocation !== "All") {
        filtered = filtered.filter(
          (item) => item.location === selectedLocation
        );
      }

      setFilteredData(filtered);
    };
    filterData();
  }, [data, selectedSalary, selectedLocation]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredData.length / itemsPerPage))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSalaryChange = (e) => {
    setSelectedSalary(e.target.value);
    setCurrentPage(1);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    setCurrentPage(1);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  console.log(paginatedData);

  return (
    <>
      {showLoader && <Loader />}
      <div
        className={` ${
          filteredData.length > 0 ? "md:mt-16" : "md:mt-14"
        } mx-auto md:max-w-3xl mt-10`}
      >
        <div className="flex items-center justify-between px-5 mx-0 ">
          <div className="w-full space-y-2">
            <h1 className="text-lg font-semibold lg:text-2xl md:text-xl text-slate-800">
              Most Viewed Interview Experiences
            </h1>
            <p className="text-xs">
              Read more interview experiences and keep yourself up to date
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center max-w-md gap-5 mx-auto mt-10 lg:max-w-lg">
          <div className="border-[1px] border-gray-200 rounded-lg py-2 w-full text-center">
            <select
              className="px-12 outline-none"
              value={selectedSalary}
              onChange={handleSalaryChange}
            >
              {salaryRanges.map((range, index) => (
                <option key={index} value={range} className="text-sm">
                  {range}
                </option>
              ))}
            </select>
          </div>
          <div className="border-[1px] border-gray-200 rounded-lg py-2 w-full text-center">
            <select
              className="px-12 outline-none"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              {locations.map((location, index) => (
                <option key={index} value={location} className="text-sm">
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="border-[1px] border-gray-200 rounded-lg py-2 w-full text-center">
            <select
              className="px-12 outline-none"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              {companies.map((company, index) => (
                <option key={index} value={company} className="text-sm">
                  {company}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 my-6 md:justify-start md:items-start ">
          {paginatedData.length > 0 ? (
            paginatedData.map((i, idx) => (
              <Link
              key={idx}
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
                <div >
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
            <div className="lg:ml-56">
              <Empty />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-5 mx-5 items my-7 lg:mx-0">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="px-2 py-1 text-white bg-black rounded-lg cursor-pointer disabled:bg-gray-300"
          >
            Prev
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index + 1)}
                className={`px-4 w-10 h-10 py-1 rounded-full ${
                  currentPage === index + 1
                    ? "bg-black text-white"
                    : "bg-stone-600 text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-white bg-black rounded-lg cursor-pointer disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
