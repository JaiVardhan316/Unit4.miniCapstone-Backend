import express from "express";
const router = express.Router();
import { createUser, getUser } from "#db/queries/users";
import { createToken } from "#utils/jwt";


router.route("/register").post(async(req, res) => {
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).send("invalid body");
    const user = await createUser(username, password);
    const token = createToken({id: user.id});
    res.status(201).send(token);
});

router.route("/login").post(async(req, res) => {
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).send("invalid body");
    const user = await getUser(username, password);
    const token = createToken({ id: user.id });
    res.send(token);
})

export default router;