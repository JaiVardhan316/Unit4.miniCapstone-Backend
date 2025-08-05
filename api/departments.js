import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  updateDepartmentById,
  getDepartments,
  getFacultyForDepartment,
} from "#db/queries/departments";
import express from "express";
import requireUser from "#middleware/requireUser";

const router = express.Router();
export default router;

router
  .route("/")
  .get(async (req, res) => {
    const departments = await getDepartments();
    res.send(departments);
  })
  .post(requireUser, async (req, res) => {
    const { name, description, images, phone, email } = req.body;
    if (!name || !description || !images || !phone || !email) {
      return res.status(400).send("All fields are required");
    }

    const newDepartment = await createDepartment(
      name,
      description,
      images,
      phone,
      email
    );

    res.status(201).send(newDepartment);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const dep = await getDepartmentById(id);
    if (!dep) return res.status(404).send("Department not found");
    res.send(dep);
  })
  .put(requireUser, async (req, res) => {
    const { id } = req.params;
    const { name, description, images, phone, email } = req.body;

    if (!name || !description || !images || !phone || !email) {
      return res
        .status(400)
        .send("At least one field must be provided to update");
    }

    const updatedDep = await updateDepartmentById(
      id,
      name,
      description,
      images,
      phone,
      email
    );
    if (!updatedDep) return res.status(404).send("no Department found");
    res.send(updatedDep);
  })
  .delete(requireUser, async (req, res) => {
    const { id } = req.params;
    const dep = await deleteDepartment(id);
    if (!dep) return res.status(404).send("department not found");
    res.send(dep);
  });

router.get("/:id/faculty", async (req, res) => {
  const { id } = req.params;
  const faculty = await getFacultyForDepartment(id);
  if (!faculty) return res.status(404).send("faculty not found");
  res.send(faculty);
});

// router.post(async (req, res, next) => {
//   try {
//     const { departmentId, facultyId } = req.params;

//     const {
//       rows: [updatedFaculty],
//     } = await client.query(
//       `
//       UPDATE faculty
//       SET department_id = $1
//       WHERE id = $2
//       RETURNING *;
//     `,
//       [departmentId, facultyId]
//     );

//     if (!updatedFaculty) {
//       return res.status(404).send("Faculty member not found.");
//     }

//     res.send(updatedFaculty);
//   } catch (err) {
//     next(err);
//   }
// });

// router.post(async (req, res, next) => {
//   try {
//     const { facultyId } = req.params;

//     const {
//       rows: [updatedFaculty],
//     } = await client.query(
//       `
//       UPDATE faculty
//       SET department_id = NULL
//       WHERE id = $1
//       RETURNING *;
//     `,
//       [facultyId]
//     );

//     if (!updatedFaculty) {
//       return res.status(404).send("Faculty member not found.");
//     }

//     res.send(updatedFaculty);
//   } catch (err) {
//     next(err);
//   }
// });
