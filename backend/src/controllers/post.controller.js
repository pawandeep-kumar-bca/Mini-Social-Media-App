const postModel = require("../models/post.model");

async function createPost(req, res) {
  try {
    let { text, image } = req.body;

    text = text?.trim();

    if (!text && !image) {
      return res.status(400).json({ message: "Empty post is not allowed" });
    }

    const postData = {
      user: req.user.id, // from auth middleware
      likesCount: 0,
      commentsCounts: 0,
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

module.exports = {
  createPost,
};
