const express = require('express');
const { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require('../controllers/blogController');

const router = express.Router();

// routes 
// GET || all blog
router.get("/all-blog", getAllBlogsController);

// POST || create blog 
router.post("/create-blog", createBlogController);

// PUT || update blog
router.put("/update-blog/:id", updateBlogController);

// GET || Single blog Detail 
router.get("/get-blog/:id", getBlogByIdController);

// DELETE || delete blog 
router.delete("/delete-blog/:id", deleteBlogController);

// GET || user blog
router.get("/user-blog/:id", userBlogController)

module.exports = router;




// http://localhost:5000/api/v1/blog/all-blog
// http://localhost:5000/api/v1/blog/create-blog
// http://localhost:5000/api/v1/blog/update-blog/:id
// http://localhost:5000/api/v1/blog/get-blog/:id
// http://localhost:5000/api/v1/blog/delete-blog/:id
// http://localhost:5000/api/v1/blog/user-blog/:id