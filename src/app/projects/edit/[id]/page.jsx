import React from "react";
import NewProjectForm from "../../../../components/Projects/NewProject";
import { redirect } from "next/navigation";
async function EditProjectPage({ params }) {
  const id = params.id;

  const departmentResponse = await fetch(`${process.env.URL}/api/departments`, {
    method: "GET",
    cache: "no-store",
  });
  const fetchDepartmentsResponse = await departmentResponse.json();
  let departments = [];
  if (fetchDepartmentsResponse.status == 200) {
    departments = fetchDepartmentsResponse.data;
  } else {
    redirect("/error-page");
  }
  const projectResponse = await fetch(
    `${process.env.URL}/api/projects/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const fetchProjectsResponse = await projectResponse.json();
  let projectDetails = null;
  if (fetchProjectsResponse.status == 200) {
    projectDetails = fetchProjectsResponse.data;
  } else {
    redirect("/error-page");
  }

  return (
    <NewProjectForm allDepartments={departments} project={projectDetails} />
  );
}

export default EditProjectPage;
