import executeQuery from "../utils/mysql";

export const selectProjects = async () => {
    const result = await executeQuery({
        query: `SELECT p.*,
                  d.department_name AS departmentName
                FROM projects p
                LEFT JOIN departments d ON p.department_id = d.department_id`,
        values: [],
    });
    return result;
};

export const addNewProject = async (project) => {
    const { project_name, start_date, end_date, budget, department_id } = project;
    const result = await executeQuery({
        query: 'INSERT INTO projects (project_name, start_date, end_date, budget, department_id) VALUES (?, ?, ?, ?, ?)',
        values: [project_name, start_date, end_date, budget, department_id],
    });
    return result;
};

export const editProject = async (project) => {
    const { project_id, project_name, start_date, end_date, budget, department_id } = project;
    const result = await executeQuery({
        query: 'UPDATE projects SET project_name = ?, start_date = ?, end_date = ?, budget = ?, department_id = ? WHERE project_id = ?',
        values: [project_name, start_date, end_date, budget, department_id, project_id],
    });
    return result;
};

export const deleteProject = async (project_id) => {
    const result = await executeQuery({
        query: 'DELETE FROM projects WHERE project_id = ?',
        values: [project_id],
    });
    return result;
};

export const getProjectByID = async (project_id) => {
    const result = await executeQuery({
        query: 'SELECT * FROM projects WHERE project_id = ?',
        values: [project_id],
    });
    return result;
};
