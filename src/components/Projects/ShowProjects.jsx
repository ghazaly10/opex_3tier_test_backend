"use client";
import React, { useState } from "react";
import Link from "next/link";
import Modal from "../ui/Modal"; // Ensure this path matches your modal component

function ShowProjects({ allProjects }) {
  const [projects, setProjects] = useState(allProjects);
  const [deleteID, setDeleteID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteID(null);
  };

  async function deleteProjectHandler() {
    try {
      const response = await fetch(`/api/projects/${deleteID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        // Fetch the updated list of projects
        const updatedProjectsResponse = await fetch(`/api/projects`, {
          method: "GET",
          cache: "no-store",
        });
        const updatedProjectsData = await updatedProjectsResponse.json();
        if (updatedProjectsData.status === 200) {
          setProjects(updatedProjectsData.data);
        } else {
          console.error("Error fetching projects post-deletion");
        }
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/projects/new"
        className="mb-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Project
      </Link>

      {/* Project Table */}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {/* Define table headers */}
              <th scope="col" className="py-3 px-6">
                Project Name
              </th>
              <th scope="col" className="py-3 px-6">
                Start Date
              </th>
              <th scope="col" className="py-3 px-6">
                End Date
              </th>
              <th scope="col" className="py-3 px-6">
                budget
              </th>
              <th scope="col" className="py-3 px-6">
                department
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.project_id} className="bg-white border-b">
                {/* Project data cells */}
                <td className="py-4 px-6">{project.project_name}</td>
                <td className="py-4 px-6">
                  {new Date(project.start_date).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">
                  {project.end_date
                    ? new Date(project.end_date).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-4 px-6">{project.budget}</td>
                <td className="py-4 px-6">{project.departmentName}</td>
                <td className="py-4 px-6 flex justify-start space-x-2">
                  <Link
                    href={`/projects/edit/${project.project_id}`}
                    className="text-blue-600 hover:text-blue-800 mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-800 mx-2"
                    onClick={() => {
                      openModal();
                      setDeleteID(project.project_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Deletion Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {/* Modal content */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-5">
          Are you sure you want to delete this project?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-white text-red-600 border border-red-600 rounded hover:bg-red-100"
          >
            No
          </button>
          <button
            onClick={() => {
              deleteProjectHandler();
              closeModal();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ShowProjects;
