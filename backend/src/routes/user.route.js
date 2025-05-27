import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMyFriends,getRecommenedUsers } from "../controllers/user.controller.js";
const router=express.Router();

router.use(protectRoute);

router.get("/",getRecommenedUsers);
router.get("/friends",getMyFriends);

router.post("/friend-request/:id",sendFriendRequest);


export default router;
