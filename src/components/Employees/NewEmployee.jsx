"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EmployeeForm = ({ allDepartments, employee }) => {
  const router=useRouter();
  const [firstName, setFirstName] = useState(
    employee ? employee.first_name : ""
  );
  const [lastName, setLastName] = useState(employee ? employee.last_name : "");
  const [email, setEmail] = useState(employee ? employee.email : "");
  const [jobTitle, setJobTitle] = useState(employee ? employee.job : "");
  const [phoneNumber, setPhoneNumber] = useState(
    employee ? employee.phone_number : ""
  );
  const [startDate, setStartDate] = useState(
    employee ? new Date(employee.hire_date).toISOString().split("T")[0] : ""
  );
  const [salary, setSalary] = useState(employee ? employee.salary : "");
  const [departmentId, setDepartmentId] = useState(
    employee ? employee.department_id : 0
  );

  function checkFormValidation() {
    if (!firstName || !lastName) {
      alert("First and last name are required.");
      return false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Invalid or missing email.");
      return false;
    }

    if (phoneNumber && !/^\+?[\d\s]{3,}$/.test(phoneNumber)) {
      alert("Invalid phone number.");
      return false;
    }

    if (!startDate || !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
      alert("Invalid or missing hire date. Format should be YYYY-MM-DD.");
      return false;
    }

    if (!jobTitle) {
      alert("Job title is required.");
      return false;
    }

    if (!salary || isNaN(salary) || salary < 0) {
      alert("Invalid salary. Salary must be a positive number or omitted.");
      return false;
    }

    if (isNaN(departmentId) || departmentId <= 0) {
      alert("Invalid department ID. " + departmentId);
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!checkFormValidation()) return;

    const formData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone_number: phoneNumber,
      hire_date: startDate,
      job: jobTitle,
      salary: salary,
      department_id: departmentId,
    };

    try {
      const url = employee
        ? `/api/employees/${employee.employee_id}`
        : `/api/employees`;
      const method = employee ? "PATCH" : "POST";
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
        if (!employee) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setSalary("");
          setJobTitle("");
          setPhoneNumber("");
          setStartDate(null);
        }else{
          router.push("/employees")
        }
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
          Employee Details
        </h2>

        {/* First Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fname"
          >
            First Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fname"
            type="text"
            placeholder="Ibrahim"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lname"
          >
            Last Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lname"
            type="text"
            placeholder="Elazb"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="ibrahim_elazb@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        {/* Job Title */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jobTitle"
          >
            Job Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="jobTitle"
            type="text"
            placeholder="Software Engineer"
            value={jobTitle}
            onChange={(event) => setJobTitle(event.target.value)}
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phoneNumber"
            type="tel"
            placeholder="+1234567890"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>

        {/* Start Date */}
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
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="salary"
          >
            Salary
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="salary"
            type="number"
            placeholder="50000"
            value={salary}
            onChange={(event) => setSalary(event.target.value)}
          />
        </div>

        {/* Department */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="department"
          >
            Department
          </label>
          <select
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="department"
            value={departmentId}
            onChange={(event) => setDepartmentId(+event.target.value)}
          >
            {allDepartments.map((department) => (
              <option value={department.department_id}>
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

export default EmployeeForm;
