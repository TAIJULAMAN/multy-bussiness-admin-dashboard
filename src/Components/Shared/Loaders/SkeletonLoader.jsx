import React from 'react';

function SkeletonLoader() {
  return (
    <div className="flex flex-row gap-2">
      <div className="animate-pulse bg-gray-300 w-14 h-14 rounded-lg"></div>
      <div className="flex flex-col gap-2">
        <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-lg"></div>
        <div className="animate-pulse bg-gray-300 w-36 h-3 rounded-lg"></div>
        <div className="animate-pulse bg-gray-300 w-36 h-2 rounded-lg"></div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
