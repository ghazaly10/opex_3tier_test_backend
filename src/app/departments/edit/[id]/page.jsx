import React from "react";
import NewDepartmentForm from "../../../../components/Departments/NewDepartment";
import { redirect } from "next/navigation";
async function EditDepartmentPage({ params }) {
  const id = params.id;
  const departmentResponse = await fetch(
    `${process.env.URL}/api/departments/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const fetchDepartmentResponse = await departmentResponse.json();
  let departmentDetails = null;
  if (fetchDepartmentResponse.status == 200) {
    departmentDetails = fetchDepartmentResponse.data;
  } else {
    redirect("/error-page");
  }

  return <NewDepartmentForm department={departmentDetails} />;
}

export default EditDepartmentPage;
