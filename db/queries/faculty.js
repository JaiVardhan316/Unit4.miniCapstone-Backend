import db from "#db/client";

export async function getAllFaculty() {
  const sql = `
    SELECT * FROM faculty
    `;
  const { rows: faculty } = await db.query(sql);
  return faculty;
}

export async function getSingleProfessorWithDept(id) {
  const sql = `
    SELECT faculty.*
    department.name AS department_name
    FROM
     faculty
    LEFT JOIN departments ON department_id = faculty.id
    WHERE id = $1
    `;
  const {
    rows: [faculty],
  } = await db.query(sql, [id]);
  return faculty;
}
