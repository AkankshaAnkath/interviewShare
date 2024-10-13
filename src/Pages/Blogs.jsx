import React, { useEffect, useState } from "react";
import { Navbar } from "../components";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:9000/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-10 py-5">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog._id}`}
              state={{
                id: blog._id,
                img: blog.img,
                title: blog.title,
                sections: blog.sections,
                comments : blog.comments
              }}
              className="border-[1px] border-gray-200 p-5 ax-w-lg space-y-3 rounded-lg cursor-pointer"
            >
              <div>
                <div>
                  <img
                    className="duration-300 ease-in rounded-lg hover:brightness-75"
                    src={blog.img}
                    alt={blog.title}
                  />
                </div>
                <div>
                  <h1 className="text-lg font-semibold underline text-slate-800">
                    {blog.title}
                  </h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
