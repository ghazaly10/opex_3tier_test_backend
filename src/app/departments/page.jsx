import React from "react";
import ShowDepartments from "../../components/Departments/ShowDepartments";
import { redirect } from "next/navigation";

async function ShowDepartmentsPage() {
  const response = await fetch(`${process.env.URL}/api/departments`, {
    method: "GET",
    cache: "no-store",
  });
  const fetchDepartmentsResponse = await response.json();
  let departments = [];
  if (fetchDepartmentsResponse.status == 200) {
    departments = fetchDepartmentsResponse.data;
  } else {
    redirect("/error-page");
  }
  return <ShowDepartments allDepartments={departments} />;
}

export default ShowDepartmentsPage;
