import {
  createDepartment,
  deleteDepartment,
  getDepartmentById,
  updateDepartmentById,
  addFacultyToDepartment,
  removeFacultyFromDepartment,
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
  res.send(faculty);
});

router.post(
  "/:departmentId/faculty/:facultyId",
  requireUser,
  async (req, res) => {
    try {
      const { departmentId, facultyId } = req.params;

      const department = await getDepartmentById(departmentId);
      if (!department) {
        return res.status(404).send("Department not found");
      }

      const updatedFaculty = await addFacultyToDepartment(
        departmentId,
        facultyId
      );

      if (!updatedFaculty) {
        return res.status(404).send("Faculty member not found");
      }

      res.send({
        message: "Faculty member successfully added to department",
        faculty: updatedFaculty,
      });
    } catch (error) {
      console.error("Error adding faculty to department:", error);
      res.status(500).send("Internal server error");
    }
  }
);

router.delete(
  "/:departmentId/faculty/:facultyId",
  requireUser,
  async (req, res) => {
    try {
      const { facultyId } = req.params;

      const updatedFaculty = await removeFacultyFromDepartment(facultyId);

      if (!updatedFaculty) {
        return res.status(404).send("Faculty member not found");
      }

      res.send({
        message: "Faculty member successfully removed from department",
        faculty: updatedFaculty,
      });
    } catch (error) {
      console.error("Error removing faculty from department:", error);
      res.status(500).send("Internal server error");
    }
  }
);
