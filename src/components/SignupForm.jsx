import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:9000/signup",
        formData
      );
      if (response.status === 200) {
        localStorage.setItem("jwt", response.data);
        navigate(`/home`);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("User already exists");
      } else {
        console.error("Error signing up:", error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 border-[1px] p-8 border-gray-300 rounded-lg">
      <div className="space-y-4 text-slate-800">
        <h1 className="text-2xl font-bold">SignUp</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <div className="flex flex-col space-y-3">
          <label className="font-semibold text-slate-800">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border-[1px] border-gray-300 py-3 px-2 rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col space-y-3">
          <label className="font-semibold text-slate-800">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border-[1px] border-gray-300 py-3 px-2 rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col space-y-3">
          <label className="font-semibold text-slate-800">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border-[1px] border-gray-300 py-3 px-2 rounded-lg outline-none"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg font-semibold w-full py-2.5"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
