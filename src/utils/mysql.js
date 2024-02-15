import mysql from "serverless-mysql";
const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
    },
});

export default async function executeQuery({ query, values }) {
    try {
        const results = await db.query(query, values);
        return results;
    } catch (error) {
        console.error('Database query error:', error);

        const customError = {
            message: 'Failed to execute query',
            detail: error.message,
            code: error.code,
        };

        throw customError;
    } finally {
        await db.end();
    }
}
