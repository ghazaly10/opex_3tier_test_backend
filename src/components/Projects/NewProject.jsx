"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProjectForm = ({ allDepartments, project }) => {
  const router = useRouter();
  const [projectName, setProjectName] = useState(
    project ? project.project_name : ""
  );
  const [startDate, setStartDate] = useState(
    project ? new Date(project.start_date).toISOString().split("T")[0] : ""
  );
  const [endDate, setEndDate] = useState(
    project && project.end_date
      ? new Date(project.end_date).toISOString().split("T")[0]
      : ""
  );
  const [budget, setBudget] = useState(project ? project.budget : "");
  const [departmentId, setDepartmentId] = useState(
    project ? project.department_id : ""
  );

  const checkFormValidation = () => {
    if (!projectName) {
      alert("Project name is required.");
      return false;
    }
    if (!startDate) {
      alert("Start date is required.");
      return false;
    }
    // Additional validation can be added here
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!checkFormValidation()) return;

    const formData = {
      project_name: projectName,
      start_date: startDate,
      end_date: endDate,
      budget: budget,
      department_id: departmentId,
    };

    try {
      const url = project
        ? `/api/projects/${project.project_id}`
        : `/api/projects`;
      const method = project ? "PATCH" : "POST";
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
        router.push("/projects");
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
          Project Details
        </h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="projectName"
          >
            Project Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startDate"
          >
            Start Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endDate"
          >
            End Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="budget"
          >
            Budget
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="departmentId"
          >
            Department
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="departmentId"
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          >
            <option value="">Select Department</option>
            {allDepartments.map((department) => (
              <option
                key={department.department_id}
                value={department.department_id}
              >
                {department.department_name}
              </option>
            ))}
          </select>
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

export default ProjectForm;
