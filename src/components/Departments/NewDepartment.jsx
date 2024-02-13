"use client";
import { useRouter } from "next/navigation"; // Note: Corrected import from "next/navigation" to "next/router"
import React, { useState } from "react";

const DepartmentForm = ({ department }) => {
  const router = useRouter();
  const [departmentName, setDepartmentName] = useState(
    department ? department.department_name : ""
  );

  const checkFormValidation = () => {
    if (!departmentName) {
      alert("Department name is required.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!checkFormValidation()) return;

    const formData = {
      name: departmentName
    };

    try {
      const url = department
        ? `/api/departments/${department.department_id}`
        : `/api/departments`;
      const method = department ? "PATCH" : "POST";
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        router.push("/departments");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="block text-gray-700 text-lg font-bold mb-4">
          Department Details
        </h2>

        {/* Department Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="departmentName"
          >
            Department Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="departmentName"
            type="text"
            placeholder="Engineering"
            value={departmentName}
            onChange={(event) => setDepartmentName(event.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
