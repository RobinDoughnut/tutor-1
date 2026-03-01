import React from "react";
import { blogs } from "../assets/data";

const Blog = () => {
  return (
      <div className="max-padd-container bg-primary py-16 xl:py-28">
          {/* Container */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-y-12 pt-6">
            {blogs.map((blog) => (
              <div key={blog.title} className="relative">
                <img src={blog.image} alt="blogImg" className="rounded-xl" />
                {/* Info */}
                <p className="medium-14 mt-6">{blog.category}</p>
                <h5 className="h5 pr-4 mb-1">{blog.title}</h5>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Expedita, tempore error?
                </p>
                <button className="underline mt-2 bold-14">
                  continue reading
                </button>
              </div>
            ))}
          </div>
      </div>
  );
};

export default Blog;
