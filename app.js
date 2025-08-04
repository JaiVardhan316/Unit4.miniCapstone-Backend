import morgan from "morgan";
import express from "express";
const app = express();
export default app;
import facultyRouter from "#api/faculty";

// middleware
app.use(express.json());
app.use(morgan("dev"));




app.use("/faculty", facultyRouter);


// GET / to send the message "Hello Lincoln!"
app.route("/").get((req, res) => {
  res.send("Hello Lincoln!");
});
