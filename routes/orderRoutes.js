import express from "express"
import authenicateUser from "../middleware/authHandler.js"
import { newOrder } from "../controllers/orderController.js"
const router = express.Router()

router.route("/newOrder").post( newOrder) //authenicateUser,

export default router
