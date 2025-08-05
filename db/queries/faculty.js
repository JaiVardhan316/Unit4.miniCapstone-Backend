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
    SELECT faculty.*,
           departments.id AS dept_id,
           departments.name AS dept_name
    FROM faculty
    LEFT JOIN departments ON departments.id = faculty.department_id
    WHERE faculty.id = $1
  `;

  const {
    rows: [row],
  } = await db.query(sql, [id]);

  if (!row) return null;

  const professor = {
    id: row.id,
    name: row.name,
    bioDescription: row.biodescription,
    bioImage: row.bioimage, // 🧠 ADD THIS LINE
    department: row.dept_id
      ? {
          id: row.dept_id,
          name: row.dept_name,
        }
      : null,
  };

  return professor;
}

export async function insertProfessor(name, image, description, deptId) {
  const sql = `
    INSERT INTO faculty
        (name, bioImage, bioDescription, department_id)
    VALUES
        ($1, $2, $3, $4)
    RETURNING *
    `;
  const {
    rows: [professor],
  } = await db.query(sql, [name, image, description, deptId]);
  return professor;
}

export async function removeProfessor(id) {
  const sql = `
    DELETE FROM faculty
    WHERE id = $1
    RETURNING *
    `;
  const {
    rows: [professor],
  } = await db.query(sql, [id]);
  return professor;
}

export async function updateProfessorById(
  id,
  name,
  email,
  bioDescription,
  bioImage
) {
  const sql = `
    UPDATE faculty
    SET name = $1,
        email = $2,
        bioDescription = $3,
        bioImage = $4
    WHERE id = $5
    RETURNING *
  `;
  const {
    rows: [professor],
  } = await db.query(sql, [name, email, bioDescription, bioImage, id]);
  return professor;
}

export async function updateProfessorDepartment(id, newDepartmentId) {
  const sql = `
    UPDATE faculty
    SET department_id = $1
    WHERE id = $2
    RETURNING *
  `;
  const {
    rows: [professor],
  } = await db.query(sql, [newDepartmentId, id]);
  return professor;
}

export async function removeProfessorFromDepartment(professorId) {
  const sql = `
    UPDATE faculty
    SET department_id = NULL
    WHERE id = $1
    RETURNING *
  `;
  const {
    rows: [professor],
  } = await db.query(sql, [professorId]);
  return professor;
}
