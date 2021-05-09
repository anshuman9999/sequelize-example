const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { User } = require("../models")

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const getUsers = async (_, res) => {
    try {
        const users = await User.findAll(
            {
                attributes: {
                    exclude: ['password']
                }
            }
        )

        res.status(200).json({
            status: "success",
            data: {
                users
            }
        })

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

const signup = async (req, res) => {
    try {
        const { firstName, lastName, age, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            first_name: firstName,
            last_name: lastName,
            age,
            email,
            password: hashedPassword
        })

        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {
            res.status(400).json({
                status: 'fail',
                message: 'Please provide an email and a password!'
            })

            return;
        }

        const user = await User.findOne({
            where: {
                email
            }
        })

        if (!user) {
            res.status(401).json({
                status: "fail",
                message: "incorrect email or password"
            })

            return;
        }

        const valid = await bcrypt.compare(password, user.password)

        if (!valid) {
            res.status(401).json({
                status: "fail",
                message: "incorrect email or password"
            })

            return;
        }

        const token = signToken(user.uuid)

        res.status(200).json({
            status: "success",
            token
        })


    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }

}

module.exports = {
    getUsers,
    signup,
    login
}