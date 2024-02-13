import React from "react";
function ErrorPage() {
  return (
    <div>
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        Something Went Wrong
      </h1>
      <p class="text-lg text-gray-500">
        We're having trouble processing your request.
      </p>
      <p class="text-md text-gray-500 mt-2 mb-6">
        Please try again later or contact support if the problem persists.
      </p>
      <div class="flex justify-center gap-4">
        <a
          href="/"
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200"
        >
          Go Home
        </a>
        <a
          href="/"
          class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors duration-200"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}

export default ErrorPage;
