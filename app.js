const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config({
    path: "./config.env"
})

const { sequelize, User, Post } = require("./models")

app.use(express.json())

const PORT = 4000;
app.listen(PORT, async () => {
    console.log(`Server started at PORT: ${PORT}`)

    await sequelize.authenticate()
        .then(() => console.log("DB Connected!"))

    await sequelize.sync({ force: true })
                    .then(() => console.log("Database Synced!"))
                    .catch(err => console.log(err))

})