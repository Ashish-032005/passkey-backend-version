import React from "react";

const footer = () => {
  return (
    <div className="bg-slate-800 flex flex-col justify-center items-center w-full">
      <div className="logo font-bold text-white text-2xl">
        <span className="text-green-500">&lt;</span>
        <span>Pass</span>
        <span className="text-green-500">Key/&gt;</span>
      </div>
      <div className="text-white font-bold text-lg">Created with ❤️ by <a href="https://www.linkedin.com/in/ashish-bb4369259/">Ashish</a></div>
    </div>
  );
};

export default footer;
