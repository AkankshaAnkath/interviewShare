import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "../components";
import Loader from "../components/Loader";
import axios from "axios";

export default function ReadFullBlog() {
  const data = useLocation();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const jwt = "66c36c272ad08e112437da05";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/blog/${data.state.id}`
        );
        setBlog(response.data.blog);
        setComments(response.data.blog.comments);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [data.state.id]);

  const handleCommentSubmit = async () => {
    if (!commentText) return;

    setLoading(true);

    try {
      await axios.post(
        `http://localhost:9000/blog/${jwt}/${data.state.id}/comment`,
        {
          comment: commentText,
        }
      );
      setCommentText("");
      const response = await axios.get(
        `http://localhost:9000/blog/${data.state.id}`
      );
      setComments(response.data.blog.comments);
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReplySubmit = async (commentId) => {
    if (!replyText) return;

    setLoading(true);

    try {
      await axios.post(
        `http://localhost:9000/blog/${jwt}/${data.state.id}/comment/${commentId}/reply`,
        {
          reply: replyText,
        }
      );
      setReplyText("");
      setReplyingTo(null); // Reset replyingTo
      const response = await axios.get(
        `http://localhost:9000/blog/${data.state.id}`
      );
      setComments(response.data.blog.comments);
    } catch (error) {
      console.error("Error adding reply:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!blog) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl my-4 md:ml-52 bg-white border-[1px] border-gray-300 p-5">
        <h2 className="text-lg font-semibold underline text-slate-800 md:text-xl">
          {blog.title}
        </h2>
        <img
          src={blog.img}
          alt={blog.title}
          className="my-3.5 rounded-lg max-w-md w-full"
        />
        {blog.sections?.map((section, secIndex) => (
          <div key={secIndex} className="mt-5 space-y-3">
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <p className="text-gray-500">{section.para}</p>
          </div>
        ))}

        <div className="my-5 space-y-3">
          <h1 className="text-lg font-semibold text-slate-800">Comments</h1>
          {loading && <Loader />}
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="border-b-[1px] border-slate-300 outline-none w-full mb-2"
            placeholder="Write comment"
            disabled={loading}
          />
          <div className="flex justify-end">
            <button
              onClick={handleCommentSubmit}
              className="font-semibold text-white bg-blue-500 rounded-full px-5 py-1.5 text-sm"
              disabled={loading}
            >
              Comment
            </button>
          </div>

          {/* Display Comments */}
          {comments?.map((comment) => (
            <div key={comment._id} className="mt-4">
              <div className="flex items-center gap-3">
                <img
                  className="object-cover w-8 h-8 rounded-full border-[1px] border-gray-300 p-1"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
                <p className="font-semibold text-gray-500">User</p>
              </div>
              <p className=" text-gray-700 mt-2.5">{comment.comment}</p>

              {/* Reply Form */}
              {replyingTo === comment._id ? (
                <>
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="border-b-[1px] border-slate-300 outline-none w-full mb-2"
                    placeholder="Write reply"
                  />
                  <button
                    onClick={() => handleReplySubmit(comment._id)}
                    className="font-semibold text-white bg-blue-500 rounded-full px-5 py-1.5 text-sm"
                  >
                    Reply
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setReplyingTo(comment._id)}
                  className="text-sm font-semibold text-blue-500"
                >
                  Reply
                </button>
              )}

              {/* Display Replies */}
              {comment.reply && (
                <div className="mt-2 border-b-[1px] border-gray-300">
                  <p className="font-semibold text-gray-500">
                    Author (replied):
                  </p>
                  <p className="mt-2 mb-2 text-sm text-gray-700">
                    {comment.reply}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
