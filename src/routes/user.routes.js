import Router from "express";
import {registerUser} from "../controllers/user.controller.js"
const Router = router();
router.route("/register").post(registerUser)
export default router;