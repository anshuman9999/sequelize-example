const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config({
    path: "./config.env"
})

const { sequelize, User } = require("./models")

app.use(express.json())

app.post('/api/users', async (req, res) => {
    const { name, role, email } = req.body
    try {
        const user = await User.create({ name, role, email })
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
})

const PORT = 4000;
app.listen(PORT, async () => {
    console.log(`Server started at PORT: ${PORT}`)
    await sequelize.authenticate()
    // await sequelize.sync({ force: true })
    console.log("Database Connected!")
})