import db from "#db/client";

export async function getDepartments() {
    const sql = `
    SELECT * FROM departments
    `;
    const {rows: departments} = await db.query(sql);
    return departments;
}

export async function getDepartmentById(id) {
    const sql = `
    SELECT * FROM departments
    WHERE id = $1
    `;
    const {rows: [department]} = await db.query(sql, [id]);
    return department;
}

