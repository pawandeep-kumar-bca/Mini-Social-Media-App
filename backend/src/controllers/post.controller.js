const postModel = require("../models/post.model");

async function createPost(req, res) {
  try {
    let { text, image } = req.body;

    text = text?.trim();

    if (!text && !image) {
      return res.status(400).json({ message: "Empty post is not allowed" });
    }

    const postData = {
      user: req.user, 
    };

    if (text) postData.text = text;
    if (image) postData.image = image;

    const post = await postModel.create(postData);

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.error("create post error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getPosts(req, res) {
  try {
   
    const page = Number(req.query) || 1;
    const limit = Number(req.query) || 10;

    const skip = (page - 1) * limit;

    const posts = await postModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name ");

    const totalPosts = await postModel.countDocuments();

    return res.status(200).json({
      message: "Posts fetched successfully",
      page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      posts,
    });
  } catch (err) {
    console.error("get posts error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  createPost,
};
