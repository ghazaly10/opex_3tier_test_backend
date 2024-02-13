import executeQuery from "../utils/mysql";

export const selectDepartments = async () => {
    const result = await executeQuery({
        query: `select * from departments`,
        values: [],
    });
    return result;
};

export const addNewDepartment = async (department_name) => {
    const result = await executeQuery({
        query: 'INSERT INTO departments (department_name) VALUES (?)',
        values: [department_name],
    });
    return result;
};

export const editDepartment = async (department_id, department_name) => {
    const result = await executeQuery({
        query: 'UPDATE departments SET department_name = ? WHERE department_id = ?',
        values: [department_name, department_id],
    });
    return result;
};

export const deleteDepartment = async (department_id) => {
    const result = await executeQuery({
        query: 'DELETE FROM departments WHERE department_id = ?',
        values: [department_id],
    });
    return result;
};

export const getByDepartmentByID = async (department_id) => {
    const result = await executeQuery({
        query: 'SELECT * FROM departments WHERE department_id = ?',
        values: [department_id],
    });
    return result;
};