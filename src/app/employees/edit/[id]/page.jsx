import React from 'react'
import NewEmployeeForm from "../../../../components/Employees/NewEmployee";
import { redirect } from "next/navigation";
async function EditEmployeesPage({params}) {
  const id=params.id;
  
  const departmentResponse = await fetch(`${process.env.URL}/api/departments`, {
    method: "GET",
    cache: "no-store",
  });
  const fetchDepartmentsResponse = await departmentResponse.json();
  let departments=[];
  if (fetchDepartmentsResponse.status==200){
    departments = fetchDepartmentsResponse.data;
  }else{
    redirect("/error-page")
  }
  const employeeResponse = await fetch(`${process.env.URL}/api/employees/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  const fetchEmployeesResponse = await employeeResponse.json();
  let employeeDetails = null;
  if (fetchEmployeesResponse.status == 200) {
    employeeDetails = fetchEmployeesResponse.data;
  } else {
    redirect("/error-page");
  }

    return (
      <NewEmployeeForm
        allDepartments={departments}
        employee={employeeDetails}
      />
    );
  
}

export default EditEmployeesPage