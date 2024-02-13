import { selectDepartments, addNewDepartment} from "../../../data-access/departments";


export async function GET(request) {
    try {
        const result = await selectDepartments();
        return Response.json({
            status: 200,
            data: result,
        }, { status: 200 });
    } catch (e) {
        console.log(e.message)
        return Response.json({
            status: 500,
            message: "Server Problem Occurred !"

        }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const { name } = await request.json()
        if(!name || name.trim()==""){
            return Response.json({
                status: 400,
                message: "Enter the department name",
            }, { status: 400 });
        }

        await addNewDepartment(name);
        return Response.json({
            status: 200,
            message: "department added successfully",
        }, { status: 200 });
    } catch (e) {
        console.log(e.message)
        return Response.json({
            status: 500,
            message: "Server Problem Occurred !"

        }, { status: 500 });
    }
}
