import React, { useEffect, useState } from "react";
import { EditModel, Navbar } from "../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    profilepic: "",
    bio: "",
    interviews: [],
    blogs: [],
  });
  const navigate = useNavigate();
  const [isedit, setisedit] = useState(false);
  const { userid } = useParams();

  
  useEffect(() => {
    axios
      .get(`http://localhost:9000/user/update/${userid}`)
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userid]);


  return (
    <div className="overflow-x-scroll bg-[#fafafa]">
      <Navbar profile={true} />
      <div className="mt-5">
        <img
          className="object-cover w-32 h-32 mx-auto duration-300 ease-in-out rounded-full hover:brightness-75"
          src={userData?.profilepic}
          alt={`profile`}
        />
        <div className="mt-4 space-y-5 text-center">
          <h1 className="text-lg font-semibold text-slate-800">
            {userData?.name}
          </h1>
          <p className="max-w-md mx-auto text-center text-slate-500">
            {userData?.bio}
          </p>
          <div className="grid max-w-md grid-cols-2 gap-3 mx-auto lg:max-w-lg">
            <button className="px-5 py-2.5 text-sm font-semibold text-black duration-500 ease-in-out border-[1px] border-blue-500 rounded-lg hover:bg-blue-500  hover:text-white">
              <Link to="/write/blog">Upload Blog</Link>
            </button>
            <button
              onClick={() => {
                navigate("/upload/experience");
              }}
              className="px-4 py-2.5 text-sm font-semibold text-black duration-500 ease-in-out border-[1px] border-blue-500 rounded-lg 0 hover:bg-blue-500 hover:text-white"
            >
              Share experience
            </button>
            <button
              onClick={() => {
                setisedit(true);
              }}
              className="col-span-2 px-4 py-2.5 text-sm font-semibold text-white duration-500 ease-in-out bg-blue-500 rounded-lg"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div className="md:ml-28">
        <h1 className="text-lg font-semibold md:text-xl text-slate-800">
          Your Experiences
        </h1>
        <div className="grid grid-cols-2 gap-5 mt-7">
          {userData?.interviews?.map((i, idx) => {
            return (
              <div
                key={idx}
                className="max-w-md md:max-w-lg lg:max-w-xl p-5 border-[1px] border-gray-300 rounded-lg cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-semibold">
                    {i.company} | {i.position}
                  </h1>
                  <img
                    src={i.companyPic}
                    className="w-10 h-10 rounded-full border-[1px] border-gray-300"
                    alt=""
                  />
                </div>
                <div className="flex items-center gap-10">
                  <img
                    src={i.ProfilePic}
                    alt=""
                    className="object-cover w-10 h-10 rounded-full border-[1px] border-gray-300"
                  />
                  <div>
                    <h1 className="flex items-center gap-3">
                      <span className="font-semibold">{i.Name}</span> |{" "}
                      <span className="text-sm text-gray-800">
                        Level {i.Level}
                      </span>{" "}
                      |{" "}
                      {i.selected ? (
                        <div className="flex items-center space-x-1">
                          <img
                            className="w-3.5 h-3.5 rounded-full"
                            src="https://static.naukimg.com/code360/assets/icons/outcome-selected.svg"
                            alt=""
                          />
                          <h1 className="text-[#70bf81] text-sm font-semibold">
                            Selected
                          </h1>
                        </div>
                      ) : null}
                    </h1>
                    <ul className="flex items-center gap-x-2 gap-y-1.5 mt-2 flex-wrap text-sm text-gray-600 ">
                      <li>{i.interviewPlace}</li>|<li>{i.collage}</li>|
                      <li>CGPA{i.CGPA}</li>|<li>rounds{i.rounds}</li>|
                      <li>NumberofProblems{i.NumberofProblems}</li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-10 ">
        <h1 className="text-lg font-semibold text-slate-800 md:ml-28 md:text-xl">
          Your Blogs
        </h1>
        <div className="grid grid-cols-3 gap-5 mx-auto my-6 md:max-w-7xl">
          {userData?.blogs?.map((item, i) => {
            return (
              <Link to={`/blog/${item._id}`} key={i}>
                <div className="border-[1px] border-gray-200 p-5 max-w-md space-y-3 rounded-lg cursor-pointer">
                  <div>
                    <img
                      src={item.img}
                      alt=""
                      className="duration-300 ease-in rounded-lg hover:brightness-75"
                    />
                  </div>
                  <div className="space-y-3.5">
                    <h1 className="text-xl font-semibold underline text-slate-800">
                      {item.title}
                    </h1>
                    <p className="text-sm text-gray-500">{item.para}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {isedit ? (
        <EditModel user={userData} userid={userid} setisedit={setisedit} />
      ) : null}
    </div>
  );
}
