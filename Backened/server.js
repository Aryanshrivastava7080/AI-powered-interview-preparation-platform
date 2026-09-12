require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")
const testAI = require("./src/services/ai.services.js")


connectToDB()

// testAI()

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

console.log(process.env.MONGO_URI)