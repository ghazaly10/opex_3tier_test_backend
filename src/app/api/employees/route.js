import { selectEmployees, addNewEmployee } from "../../../data-access/employees";

export async function GET(request) {
    try {
        const result = await selectEmployees();
        return Response.json({
            status: 200,
            data: result,
        }, { status: 200});
    } catch (e) {
        console.error(e.message);
        return Response.json({
            status: 500,
            message: "Server Problem Occurred!",
        }, { status: 500});
    }
}

export async function POST(request) {
    try {
        const { first_name, last_name, email, phone_number, hire_date, job, salary, department_id } = await request.json();

        if (!first_name || first_name.trim() === "" || !last_name || last_name.trim() === "") {
            return Response.json({
                status: 400,
                message: "First and last name are required.",
            }, { status: 400 });
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return Response.json({
                status: 400,
                message: "Invalid or missing email.",
            }, { status: 400 });
        }

        if (phone_number && !/^\+?[\d\s]{3,}$/.test(phone_number)) {
            return Response.json({
                status: 400,
                message: "Invalid phone number.",
            }, { status: 400 });
        }

        if (!hire_date || !/^\d{4}-\d{2}-\d{2}$/.test(hire_date)) {
            return Response.json({
                status: 400,
                message: "Invalid or missing hire date. Format should be YYYY-MM-DD.",
            }, { status: 400 });
        }

        if (!job || job.trim() === "") {
            return Response.json({
                status: 400,
                message: "Job title is required.",
            }, { status: 400 });
        }

        if (salary !== undefined && (isNaN(salary) || salary < 0)) {
            return Response.json({
                status: 400,
                message: "Invalid salary. Salary must be a positive number or omitted.",
            }, { status: 400 });
        }

        if (isNaN(department_id) || department_id <= 0) {
            return Response.json({
                status: 400,
                message: "Invalid department ID.",
            }, { status: 400 });
        }


        await addNewEmployee({ first_name, last_name, email, phone_number, hire_date, job, salary, department_id });
        return Response.json({
            status: 200,
            message: "Employee added successfully",
        }, { status: 200});
    } catch (e) {
        if ((e.code === 'ER_NO_REFERENCED_ROW' || e.code === 'ER_NO_REFERENCED_ROW_2') && e.detail?.includes("fk_department_employees")) {
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
