const postModel = require("../models/post.model");
const imagekit = require("../config/imagekit");
// ✅ CREATE POST
async function createPost(req, res) {
  try {
    let { text } = req.body;
    text = text?.trim();

    let imageUrl = "";

    // Upload image if exists
    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer, // buffer from multer
        fileName: `post_${Date.now()}`,
        folder: "/posts",
      });

      imageUrl = result.url;
    }

    // Validation
    if (!text && !imageUrl) {
      return res.status(400).json({ message: "Empty post is not allowed" });
    }

    const post = await postModel.create({
      user: req.user.id,
      text,
      image: imageUrl,
      likesCount: 0,
      commentsCounts: 0,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (err) {
    console.error("create post error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ GET POSTS 
async function getPosts(req, res) {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const posts = await postModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username")
      .populate("comments.user", "username");

    const totalPosts = await postModel.countDocuments();

    return res.status(200).json({
      message: "Posts fetched successfully",
      page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      posts
    });

  } catch (err) {
    console.error("get posts error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ TOGGLE LIKE 
async function toggleLike(req, res) {
  try {
    const userId = req.user.id;
    const postId = req.params.id;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return res.status(200).json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likesCount: post.likes.length,
      isLiked: !alreadyLiked
    });

  } catch (err) {
    console.error("like error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// ✅ ADD COMMENT 
async function addComment(req, res) {
  try {
    const userId = req.user.id;
    const postId = req.params.id;
    let { text } = req.body;

    text = text?.trim();

    if (!text) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      user: userId,
      text
    };

    post.comments.push(newComment);

    await post.save();

    return res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
      commentsCount: post.comments.length
    });

  } catch (err) {
    console.error("comment error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createPost,
  getPosts,
  toggleLike,
  addComment
};