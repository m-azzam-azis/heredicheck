import React from "react";

const BgDecoration = () => {
  return (
    <>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-0 h-full w-full opacity-5"
      >
        <defs>
          <pattern
            id="dna-pattern"
            patternUnits="userSpaceOnUse"
            width="100"
            height="100"
          >
            <path
              d="M50 10C50 10 80 20 80 50C80 80 50 90 50 90"
              stroke="#16a34a"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M50 10C50 10 20 20 20 50C20 80 50 90 50 90"
              stroke="#16a34a"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="50" cy="20" r="2" fill="#16a34a" />
            <circle cx="50" cy="35" r="2" fill="#16a34a" />
            <circle cx="50" cy="50" r="2" fill="#16a34a" />
            <circle cx="50" cy="65" r="2" fill="#16a34a" />
            <circle cx="50" cy="80" r="2" fill="#16a34a" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dna-pattern)" />
      </svg>
    </>
  );
};

export default BgDecoration;
