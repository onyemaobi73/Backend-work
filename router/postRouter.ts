import express from "express"
import {

} from "../controller/userController"
import {image} from "../config/multer"
import { createPost, getAllPost, getUserPost, unvotePost, viewVotedPost, votePost } from "../controller/postController"


const router = express.Router()

router.route("/:userID/create-post").post(createPost, image)

router.route("/get-all-post").get(getAllPost)
router.route("/:userID/get-post").post(votePost)
router.route("/:userID/get-post").get(getUserPost)

router.route("/userID/:postID/vote-post").post(votePost)
router.route("/:userID/:postID/:likeID/unvote-post").post(unvotePost)
router.route("/:postID/view-vote-post").get(viewVotedPost)

export default router