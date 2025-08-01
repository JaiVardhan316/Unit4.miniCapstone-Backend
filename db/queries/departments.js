import db from "#db/client";

export async function getDepartments() {
  const sql = `
    SELECT * FROM departments
    `;
  const { rows: departments } = await db.query(sql);
  return departments;
}

export async function getDepartmentById(id) {
  const sql = `
    SELECT * FROM departments
    WHERE id = $1
    `;
  const {
    rows: [department],
  } = await db.query(sql, [id]);
  return department;
}

export async function createDepartment(
  name,
  description,
  images = null,
  phone = null,
  email = null
) {
  const sql = `
    INSERT INTO departments (name, description, images, phone, email)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `;
  const {
    rows: [department],
  } = await db.query(sql, [name, description, images, phone, email]);
  return department;
}

export async function deleteDepartment(id) {
  const sql = `
    DELETE FROM departments
    WHERE id = $1
    RETURNING *
    `;
  const {
    rows: [department],
  } = await db.query(sql, [id]);
  return department;
}

export async function addFacultyToDepartment(departmentId, facultyId) {
  const sql = `
    UPDATE faculty
    SET department_id = $1
    WHERE id = $2
    RETURNING *
    `;
  const {
    rows: [faculty],
  } = await db.query(sql, [departmentId, facultyId]);
  return faculty;
}

export async function removeFacultyFromDepartment(facultyId) {
  const sql = `
    UPDATE faculty
    SET department_id = NULL
    WHERE id = $1
    RETURNING *
    `;
  const {
    rows: [faculty],
  } = await db.query(sql, [facultyId]);
  return faculty;
}
