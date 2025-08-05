import express from "express";
const router = express.Router();
export default router;
import {
  getAllFaculty,
  getSingleProfessorWithDept,
  updateProfessorById,
  updateProfessorDepartment,
  insertProfessor,
  removeProfessor,
  removeProfessorFromDepartment
} from "#db/queries/faculty";

import requireUser from "#middleware/requireUser";

router
  .route("/")
  .get(async (req, res) => {
    const departments = await getAllFaculty();
    res.send(departments);
  })
  .post(requireUser, async (req, res) => {
    const { name, bioDescription, bioImage, departmentId } = req.body;
    if (!name || !bioDescription || !bioImage || !departmentId) {
      return res.status(400).send("All fields are required");
    }

    const newProfessor = await insertProfessor(
      name,
      bioImage,
      bioDescription,
      departmentId
    );

    res.status(201).send(newProfessor);
  });

router
  .route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const prof = await getSingleProfessorWithDept(id);
    if (!prof) return res.status(404).send("Professor not found");
    res.send(prof);
  })
  .put(requireUser, async (req, res) => {
    const { id } = req.params;
    const { name, email, bioDescription, bioImage } = req.body;

    if (!name || !email || !bioDescription || !bioImage) {
      return res
        .status(400)
        .send("At least one field must be provided to update");
    }

    const updatedProf = await updateProfessorById(
      id,
      name,
      email,
      bioDescription,
      bioImage
    );
    if (!updatedProf) return res.status(404).send("no Profesor found");
    res.send(updatedProf);
  })
  .delete(requireUser, async (req, res) => {
    const { id } = req.params;
    const prof = await removeProfessor(id);
    if (!prof) return res.status(404).send("professor not found");
    res.send(prof);
  });

router.route("/:id/department").put(requireUser, async (req, res) => {
  const { id } = req.params;
  const { departmentId } = req.body;

  if (!departmentId) return res.status(400).send("missing dept ID");

  const updatedProf = await updateProfessorDepartment(id, departmentId);

  if (!updatedProf) {
    return res.status(404).send("Professor not found");
  }

  res.send(updatedProf);
}).delete(requireUser, async (req, res) => {
  const {id} = req.params;
  const updatedProf = await removeProfessorFromDepartment(id);
  if (!updatedProf) return res.status(404).send("professor not found");
  res.send(updatedProf);
})
