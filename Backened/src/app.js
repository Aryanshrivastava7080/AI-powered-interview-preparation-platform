const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()
const interviewRouter = require("./routes/interview_routes")


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// require all the routes here
const authRoutes = require("./routes/auth.routes")



/*using all the routes here */
app.use("/api/auth",authRoutes)
app.use("/api/interview", interviewRouter);


app.use("/api/interview", interviewRouter)







module.exports = app