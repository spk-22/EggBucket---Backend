import express from "express"
import { newUser } from "../controllers/customerController.js"
import authenicateUser from "../middleware/authHandler.js"
const router = express.Router()

router.route("/newUser").post( newUser) //authenicateUser,

export default router
