import { editProject, deleteProject, getProjectByID } from "../../../../data-access/projects";

export async function PATCH(request, { params }) {
    try {
        const project_id = params.id;
        const { project_name, start_date, end_date, budget, department_id } = await request.json();

        if (!project_name || project_name.trim() === "") {
            return Response.json({
                status: 400,
                message: "Project name is required",
            }, { status: 400 });
        }

        if (!start_date || !/^\d{4}-\d{2}-\d{2}$/.test(start_date)) {
            return Response.json({
                status: 400,
                message: "Invalid or missing start date. Format should be YYYY-MM-DD.",
            }, { status: 400 });
        }

        if (end_date && !/^\d{4}-\d{2}-\d{2}$/.test(end_date)) {
            return Response.json({
                status: 400,
                message: "Invalid end date. Format should be YYYY-MM-DD.",
            }, { status: 400 });
        }

        if (isNaN(budget) || budget <= 0) {
            return Response.json({
                status: 400,
                message: "Budget must be a positive number.",
            }, { status: 400 });
        }

        if (isNaN(department_id) || department_id <= 0) {
            return Response.json({
                status: 400,
                message: "Invalid department ID.",
            }, { status: 400 });
        }


        const result = await editProject({ project_id, project_name, start_date, end_date, budget, department_id});
        if (result.affectedRows == 0) {
            return Response.json({
                status: 404,
                message: "This Project Does Not Exist",
            }, { status: 404 });
        }

        return Response.json({
            status: 200,
            message: "Project Updated Successfully",
        }, { status: 200 });
    } catch (e) {
        if ((e.code === 'ER_NO_REFERENCED_ROW' || e.code === 'ER_NO_REFERENCED_ROW_2') && e.detail?.includes("fk_department_projects")) {
            return Response.json({
                status: 400,
                message: "Department ID does not exist.",
            }, { status: 400 });
        }
        console.log("------------- error message ----------------")
        console.error(e.message);
        console.log("--------------------------------------------")
        return Response.json({
            status: 500,
            message: "Server Problem Occurred!",
        }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const id = params.id;
        const result = await deleteProject(id);
        if (result.affectedRows == 0) {
            return Response.json({
                status: 404,
                message: "This Project Does Not Exist",
            }, { status: 404 });
        }

        return Response.json({
            status: 200,
            message: "Project Deleted Successfully",
        }, { status: 200 });
    } catch (e) {
        console.error(e.message);
        return Response.json({
            status: 500,
            message: "Server Problem Occurred!",
        }, { status: 500 });
    }
}

export async function GET(request, { params }) {
    try {
        const id = params.id;
        const result = await getProjectByID(id);
        if (result.length == 0) {
            return Response.json({
                status: 404,
                message: "This Project Does Not Exist",
            }, { status: 404 });
        }

        return Response.json({
            status: 200,
            data: result[0],
        }, { status: 200 });
    } catch (e) {
        console.error(e.message);
        return Response.json({
            status: 500,
            message: "Server Problem Occurred!",
        }, { status: 500 });
    }
}
