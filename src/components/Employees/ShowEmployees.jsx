"use client";
import React, { useState } from "react";
import Link from "next/link";
import Modal from "../ui/Modal";

function ShowEmployees({ allEmployees }) {
  const [employees, setEmployees] = useState(allEmployees);
  const [deleteID, setDeletedID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  async function deleteEmployeeHandler() {
    try {
      const response = await fetch(`/api/employees/${deleteID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        const response = await fetch(`/api/employees`, {
          method: "GET",
          cache: "no-store",
        });
        const fetchEmployeesResponse = await response.json();
        if (fetchEmployeesResponse.status == 200) {
          setEmployees(fetchEmployeesResponse.data);
        } else {
          redirect("/error-page");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/employees/new"
        className="mb-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add New Employee
      </Link>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                First Name
              </th>
              <th scope="col" className="py-3 px-6">
                Last Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Phone Number
              </th>
              <th scope="col" className="py-3 px-6">
                Hire Date
              </th>
              <th scope="col" className="py-3 px-6">
                Job
              </th>
              <th scope="col" className="py-3 px-6">
                Salary
              </th>
              <th scope="col" className="py-3 px-6">
                Department
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={employee.employee_id}
              >
                <td className="py-4 px-6">{employee.first_name}</td>
                <td className="py-4 px-6">{employee.last_name}</td>
                <td className="py-4 px-6">{employee.email}</td>
                <td className="py-4 px-6">{employee.phone_number}</td>
                <td className="py-4 px-6">
                  {new Date(employee.hire_date).toLocaleDateString()}
                </td>
                <td className="py-4 px-6">{employee.job}</td>
                <td className="py-4 px-6">{employee.salary}</td>
                <td className="py-4 px-6">{employee.departmentName}</td>
                <td className="py-4 px-6 flex justify-start space-x-2">
                  <Link
                    href={`/employees/edit/${employee.employee_id}`}
                    className="text-blue-600 hover:text-blue-800  mx-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-800 mx-2"
                    onClick={() => {
                      openModal();
                      setDeletedID(employee.employee_id);
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Modal Title</h2>
        <p className="text-gray-600 mb-5">
          This is the modal content. Are you sure you want to proceed?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => {
              closeModal();
              if (deleteID) {
                deleteEmployeeHandler();
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

export default ShowEmployees;
