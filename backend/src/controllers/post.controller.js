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
async function toggleLike(req, res) {
  try {
    const userId = req.user;
    const postId = req.params.id;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      post.likesCount = Math.max(0, post.likesCount - 1);

      await post.save();

      return res.status(200).json({
        message: "Post unliked",
        likesCount: post.likesCount,
      });
    } else {
      // Like
      post.likes.push(userId);
      post.likesCount += 1;

      await post.save();

      return res.status(200).json({
        message: "Post liked",
        likesCount: post.likesCount,
      });
    }
  } catch (err) {
    console.error("like post error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function addComment(req, res) {
  try {
    const userId = req.user;
    const postId = req.params.id;
    let { text } = req.body;

    text = text?.trim();

    // Validate text
    if (!text) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    // Find post
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create comment object
    const newComment = {
      user: userId,
      text,
    };

    // Add comment
    post.comments.push(newComment);

    // Update count
    post.commentsCounts += 1;

    await post.save();

    return res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
      commentsCounts: post.commentsCounts,
    });
  } catch (err) {
    console.error("add comment error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
module.exports = {
  createPost,getPosts,toggleLike,addComment
};
