import React from "react";

const FamilyTree = () => {
  return (
    <>
      <svg
        viewBox="0 0 500 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
      >
        <rect width="500" height="300" fill="#e6f7ec" />

        {/* Family tree lines */}
        <line
          x1="250"
          y1="60"
          x2="250"
          y2="90"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="250"
          y1="90"
          x2="150"
          y2="90"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="250"
          y1="90"
          x2="350"
          y2="90"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="150"
          y1="90"
          x2="150"
          y2="120"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="350"
          y1="90"
          x2="350"
          y2="120"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="150"
          y1="120"
          x2="100"
          y2="120"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="150"
          y1="120"
          x2="200"
          y2="120"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="350"
          y1="120"
          x2="300"
          y2="120"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="350"
          y1="120"
          x2="400"
          y2="120"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="100"
          y1="120"
          x2="100"
          y2="150"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="120"
          x2="200"
          y2="150"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="300"
          y1="120"
          x2="300"
          y2="150"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="400"
          y1="120"
          x2="400"
          y2="150"
          stroke="#16a34a"
          strokeWidth="2"
        />

        {/* Circles representing family members */}
        <circle cx="250" cy="50" r="20" fill="#16a34a" />
        <circle cx="150" cy="120" r="20" fill="#16a34a" opacity="0.8" />
        <circle cx="350" cy="120" r="20" fill="#16a34a" opacity="0.8" />
        <circle cx="100" cy="150" r="15" fill="#16a34a" opacity="0.6" />
        <circle cx="200" cy="150" r="15" fill="#16a34a" opacity="0.6" />
        <circle cx="300" cy="150" r="15" fill="#16a34a" opacity="0.6" />
        <circle cx="400" cy="150" r="15" fill="#16a34a" opacity="0.6" />

        {/* DNA strand at bottom */}
        <path
          d="M100 230C100 230 180 210 250 230C320 250 400 230 400 230"
          stroke="#16a34a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M100 270C100 270 180 290 250 270C320 250 400 270 400 270"
          stroke="#16a34a"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="150"
          y1="220"
          x2="150"
          y2="280"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="200"
          y1="220"
          x2="200"
          y2="280"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="250"
          y1="230"
          x2="250"
          y2="270"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="300"
          y1="240"
          x2="300"
          y2="260"
          stroke="#16a34a"
          strokeWidth="2"
        />
        <line
          x1="350"
          y1="235"
          x2="350"
          y2="265"
          stroke="#16a34a"
          strokeWidth="2"
        />
      </svg>
    </>
  );
};

export default FamilyTree;
