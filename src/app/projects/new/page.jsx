import React from "react";
import ProjectForm from "../../../components/Projects/NewProject";
import { redirect } from "next/navigation";
async function NewProjectsPage() {
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
  return <ProjectForm allDepartments={departments} project={null} />;
}

export default NewProjectsPage;
