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

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    const image = req.file?.filename;

    // Validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const existingUser = await userModel.findById(user);

    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    const newBlog = new blogModel({
      title,
      description,
      image,
      user,
    });

    // Use session to ensure consistency
    const session = await mongoose.startSession();
    session.startTransaction();

    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });

    await session.commitTransaction();

    return res.status(201).send({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while creating blog",
      error,
    });
  }
};


exports.updateBlogController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(400).send({
                success: false,
                message: "Unable to find blog"
            })
        }
        const updatedBlog = await blogModel.findByIdAndUpdate(
            id,
            { title, description, image },
            { new: true }
        );

        return res.status(200).send({
            success: true,
            message: "Blog updated",
            updatedBlog
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while Updating blog",
            error
        });

    }
}

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
