import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },

    text: {
      type: String,
      trim: true,
    },

    image: {
      type: String, 
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likesCount:{
        type:Number,
        default: 0
    },
    comments: [commentSchema],
    commentsCounts :{
        type:Number,
        default: 0
    }
  },
  {
    timestamps: true, 
  }
);

const postModel = new mongoose.model("Post", postSchema);

module.exports = postModel