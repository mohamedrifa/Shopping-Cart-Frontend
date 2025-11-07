import React from "react";

export default function Loader({message = "Loading..."}) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-blue-300 border-t-transparent rounded-full animate-[spin_1.5s_linear_reverse_infinite]"></div>
      </div>
      <p className="mt-5 text-gray-700 font-semibold text-lg tracking-wide">
        {message}
      </p>
    </div>
  );
}
