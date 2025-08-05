import express from "express";
import cors from "cors";
const app = express();
export default app;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

import morgan from "morgan";
// import getUserFromToken from "#middleware/getUserFromToken";
import departmentsRouter from "#api/departments";
import facultyRouter from "#api/faculty";
// import adminsRouter from "#api/admins";
import userRouter from "#api/user";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/pictures", express.static("pictures"));

// app.use(getUserFromToken);

app.use("/api/auth", userRouter);
app.use("/api/departments", departmentsRouter);

// app.use("/departments", departmentsRouter);
app.use("/api/faculty", facultyRouter);
// app.use("/admins", adminsRouter);

app.use((err, req, res, next) => {
  // A switch statement can be used instead of if statements
  // when multiple cases are handled the same way.
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
