const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config({
    path: "./config.env"
})

const { sequelize, User } = require("./models")

app.use(express.json())

app.post('/api/users', async (req, res) => {
    const { firstName, lastName, age, email } = req.body
    try {
        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            age,
            email
        })
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
        .then(() => console.log("DB Connected!"))

    // await sequelize.sync({ force: true })
    //                 .then(() => console.log("Database Synced!"))
    //                 .catch(err => console.log(err))

})