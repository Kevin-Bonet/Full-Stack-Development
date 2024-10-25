import express from "express"

const router = express.Router()

router.route("/").get((rew, res) => res.send("hello world"))

export default router