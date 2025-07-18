const mongoose = require('mongoose')
const blogModel = require('../models/blogModel')
const userModel = require('../models/userModel')


exports.getAllBlogsController = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate("user")

        if (blogs.length === 0) {
            return res.status(200).send({
                success: false,
                message: "No Blogs Found"
            })
        }
        return res.status(200).send({
            blogCount: blogs.length,
            success: true,
            message: "all blog data",
            blogs
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in get  all blogs ",
            success: false,
            error,
        })

    }
}


// exports.createBlogController = async (req, res) => {
//   try {
//     const { title, description, image, user } = req.body;
//     const existingUser = await userModel.findById(user); 
//     console.log(existingUser);
    
//     if (!title || !description || !image || !user) {
//       return res.status(400).json({ success: false, message: "Missing fields" });
//     }

//     const blog = new blogModel({
//       title,
//       description,
//       image,  // image filename ya URL  
//       user,
//     });

//     await blog.save();

//     return res.status(201).json({
//       success: true,
//       message: "Blog created successfully",
//       blog,
//     });
//   } catch (error) {
//     console.error("Create blog error:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    // ✅ Check all fields
    if (!title || !description || !image || !user) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (title, description, image, user)",
      });
    }

    // ✅ Validate user exists
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found with this ID",
      });
    }

    // ✅ Create new blog
    const newBlog = new blogModel({
      title,
      description,
      image,
      user,
    });

    await newBlog.save();

    // ✅ Push blog to user's blog array if model has blogs field
    existingUser.blogs.push(newBlog._id);
    await existingUser.save();

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });

  } catch (error) {
    console.error("Error in createBlogController:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating blog",
      error: error.message,
    });
  }
};



exports.updateBlogController = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    const blog = await blogModel.findById(req.params.id);

    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.image = image || blog.image;  // image URL ya filename

    await blog.save();

    res.status(200).json({ success: true, message: "Blog updated successfully", blog });
  } catch (err) {
    console.error("Update blog error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


exports.getBlogByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(400).send({
                success: false,
                message: "blog not found with this is "
            })
        }
        return res.status(200).send({
            success: true,
            message: "Fetch single blog",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while getting single  blog",
            error
        });

    }
}

exports.deleteBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id).populate("user")

        if (!blog) {
            return res.status(400).send({
                success: false,
                message: "blog not found"
            })
        }

        await blog.user.blogs.pull(blog._id);
        await blog.user.save();


        // delete blog
        await blogModel.findByIdAndDelete(id);

        return res.status(200).send({
            success: true,
            message: "Blog deleted successfully",
            blog
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while deleting single blog",
            error
        });
    }
}

exports.userBlogController = async (req, res) => {
    try {
        const userId = req.params.id;

        const userBlog = await userModel.findById(userId).populate("blogs");
        if (!userBlog) {
            return res.status(400).send({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).send({
            success: true,
            message: "user blog fetch successfully",
            blogLength: userBlog.blogs.length,
            userBlog: userBlog.blogs
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while getting  user blog",
            error
        });
    }
}
