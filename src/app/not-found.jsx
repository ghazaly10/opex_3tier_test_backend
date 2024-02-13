import React from "react";

function NotFoundPage() {
  return (
    <div className="text-center my-10">
      <h1 className="text-6xl font-bold text-gray-800">404 Not Found</h1>
      <p className="text-gray-600 mt-4">
        The page you're looking for doesn't exist.
      </p>
      <a
        href="/"
        className="mt-6 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
      >
        Go Home
      </a>
    </div>
  );
}

export default NotFoundPage;
