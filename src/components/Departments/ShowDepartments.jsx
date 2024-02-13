"use client";
import React, { useState } from "react";
import Link from "next/link";
import Modal from "../ui/Modal";

function ShowDepartments({ allDepartments }) {
  const [departments, setDepartments] = useState(allDepartments);
  const [deleteID, setDeletedID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  async function deleteDepartmentHandler() {
    try {
      const response = await fetch(`/api/departments/${deleteID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        const newDepartmentsResponse = await fetch(`/api/departments`, {
          method: "GET",
          cache: "no-store",
        });
        const departmentsData = await newDepartmentsResponse.json();
        if (departmentsData.status === 200) {
          setDepartments(departmentsData.data);
        } else {
          console.error("Error fetching departments post-deletion");
        }
      }
    } catch (error) {
      console.error("Error deleting department:", error);
      alert("An error occurred while deleting the department.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/departments/new"
        className="mb-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Department
      </Link>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Index
              </th>
              <th scope="col" className="py-3 px-6">
                Department Name
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department, index) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={department.department_id}
              >
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{department.department_name}</td>
                <td className="py-4 px-6 flex justify-start space-x-2">
                  <Link
                    href={`/departments/edit/${department.department_id}`}
                    className="text-blue-600 hover:text-blue-800 mx-5"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-800 mx-5"
                    onClick={() => {
                      openModal();
                      setDeletedID(department.department_id);
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
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          closeModal();
          setDeletedID(null);
        }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-5">
          Are you sure you want to delete this department?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => {
              closeModal();
              if (deleteID) {
                deleteDepartmentHandler();
              }
            }}
            className="px-4 py-2 bg-white text-red-600 border border-red-600 rounded hover:bg-red-100"
          >
            Yes
          </button>
          <button
            onClick={() => {
              closeModal();
              setDeletedID(null);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ShowDepartments;
