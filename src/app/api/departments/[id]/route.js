import { editDepartment, deleteDepartment, getByDepartmentByID } from "../../../../data-access/departments";
export async function PATCH(request, { params }) {
    try {
        const id = params.id;
        const { name } = await request.json()
        if (!name || name.trim() == "") {
            return Response.json({
                status: 400,
                message: "Enter the department name",
            }, { status: 400 });
        }

        const result = await editDepartment(id, name);
        if (result.affectedRows == 0) {
            return Response.json({
                status: 404,
                message: "This Department Not Exist",
            }, { status: 404 });
        }
        return Response.json({
            status: 200,
            message: "department Updated successfully",
        }, { status: 200 });
    } catch (e) {
        console.log(e.message)
        return Response.json({
            status: 500,
            message: "Server Problem Occurred !"

        }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const id = params.id;
        const result = await deleteDepartment(id);
        if (result.affectedRows == 0) {
            return Response.json({
                status: 404,
                message: "This Department Not Exist",
            }, { status: 404 });
        }
        return Response.json({
            status: 200,
            message: "department Deleted successfully",
        }, { status: 200 });
    } catch (e) {

        if ((e.code === 'ER_ROW_IS_REFERENCED' || e.code === 'ER_ROW_IS_REFERENCED_2') && e.detail?.includes("fk_department_projects")) {
            return Response.json({
                status: 400,
                message: "Unable To Remove This Department before removing  projects related to it",
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

export async function GET(request, { params }) {
    try {
        const id = params.id;
        const result = await getByDepartmentByID(id);
        if (result.length == 0) {
            return Response.json({
                status: 404,
                message: "This Department Not Exist",
            }, { status: 404 });
        }
        return Response.json({
            status: 200,
            data: result[0],
        }, { status: 200 });
    } catch (e) {
        console.log(e.message)
        return Response.json({
            status: 500,
            message: "Server Problem Occurred !"

        }, { status: 500 });
    }
}