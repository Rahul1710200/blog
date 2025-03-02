import express from "express";
import {createPost,getAllPosts,getPostById,deletePost,updatePost} from '../controller/post.controller.js'


const router = express.Router();


router.post("/create", createPost); 
router.get("/getAllPosts", getAllPosts); 
router.get("/getPost/:id", getPostById); 
router.put("/update/:id", updatePost); 
router.delete("/delete/:id", deletePost); 

export default router;
