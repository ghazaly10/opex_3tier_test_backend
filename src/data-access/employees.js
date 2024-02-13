import executeQuery from "../utils/mysql";

export const selectEmployees = async () => {
    const result = await executeQuery({
        query: `SELECT e.*,
                  d.department_name AS departmentName
                FROM employees e
                LEFT JOIN departments d ON e.department_id = d.department_id`,
        values: [],
    });
    return result;
};

export const addNewEmployee = async (employee) => {
    const { first_name, last_name, email, phone_number, hire_date, job, salary, department_id } = employee;
    const result = await executeQuery({
        query: 'INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job, salary, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        values: [first_name, last_name, email, phone_number, hire_date, job, salary, department_id],
    });
    return result;
};

export const editEmployee = async (employee) => {
    const { employee_id, first_name, last_name, email, phone_number, hire_date, job, salary, department_id } = employee;
    const result = await executeQuery({
        query: 'UPDATE employees SET first_name = ?, last_name = ?, email = ?, phone_number = ?, hire_date = ?, job = ?, salary = ?, department_id = ? WHERE employee_id = ?',
        values: [first_name, last_name, email, phone_number, hire_date, job, salary, department_id, employee_id],
    });
    return result;
};

export const deleteEmployee = async (employee_id) => {
    const result = await executeQuery({
        query: 'DELETE FROM employees WHERE employee_id = ?',
        values: [employee_id],
    });
    return result;
};

export const getEmployeeByID = async (employee_id) => {
    const result = await executeQuery({
        query: 'SELECT * FROM employees WHERE employee_id = ?',
        values: [employee_id],
    });
    return result;
};
