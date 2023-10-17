import express, {Router} from "express"
import { getUser, getUsers, registerUser, signInUser } from "../controller/userController"
// import {uploads} from "../config/multer"
// import { check } from "exp"

const router = express.Router()
router.route("/register").post(registerUser)

router.route("/sign-in").post(signInUser)

router.route("/get-users").get(getUsers)
router.route("/:userID/user").get(getUser)

export default router