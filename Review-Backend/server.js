import express from "express"
import cors from "cors"
import reviews from "./API/reviews.route.js"

const app = express()
app.use(cors({ origin: 'http://127.0.0.1:5500' }));
//app.use(cors())
app.use(express.json())

app.use("/api/v1/reviews", reviews)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app