import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  IconButton,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import API from "../api/axios";
import CommentSection from "./CommentSection";

export default function PostCard({ post, refresh }) {
  const [showComments, setShowComments] = useState(false);

  // LIKE STATE
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // TIME STATE 
  const [timeAgo, setTimeAgo] = useState("");

  // TIME FUNCTION
  const getTimeAgo = (date) => {
    const now = new Date();
    const created = new Date(date);

    const seconds = Math.floor((now - created) / 1000);

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks}w ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months}mo ago`;

    const years = Math.floor(days / 365);
    return `${years}y ago`;
  };

  // INITIAL SETUP
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const liked = post.likes?.some(
      (id) => id && id.toString() === userId
    );

    setIsLiked(liked);
    setLikesCount(post.likes?.length || 0);
  }, [post]);

  // AUTO TIME UPDATE
  useEffect(() => {
    const updateTime = () => {
      setTimeAgo(getTimeAgo(post.createdAt));
    };

    updateTime(); // first render

    const interval = setInterval(updateTime, 60000); // every 1 min

    return () => clearInterval(interval);
  }, [post.createdAt]);

  // LIKE HANDLER
  const handleLike = async () => {
    try {
      const res = await API.put(`/posts/${post._id}/like`);
      setIsLiked(res.data.isLiked);
      setLikesCount(res.data.likesCount);
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  // COMMENT TOGGLE
  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid #e0e0e0",
        boxShadow: "none",
        overflow: "hidden",
      }}
    >
      {/*  HEADER */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#2563eb" }}>
            {post.user?.username?.[0]}
          </Avatar>
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          <Typography fontWeight="bold" fontSize="14px">
            {post.user?.username}
          </Typography>
        }
        subheader={
          <Typography fontSize="12px" color="text.secondary">
            {timeAgo}
          </Typography>
        }
      />

      {/*  TEXT */}
      <CardContent sx={{ pt: 0 }}>
        <Typography fontSize="14px" lineHeight={1.6}>
          {post.text}
        </Typography>
      </CardContent>

      {/*  IMAGE */}
      {post.image && (
        <CardMedia
          component="img"
          image={post.image}
          sx={{
            maxHeight: 400,
            objectFit: "cover",
          }}
        />
      )}

      {/*  COUNTS */}
      <Box px={2} py={1}>
        <Typography fontSize="13px" color="text.secondary">
          👍 {likesCount} likes • 💬 {post.comments?.length || 0} comments
        </Typography>
      </Box>

      <Divider />

      {/* ACTION BUTTONS */}
      <Stack direction="row" justifyContent="space-around" py={1}>
        <ButtonAction
          icon={
            isLiked ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )
          }
          label="Like"
          onClick={handleLike}
        />

        <ButtonAction
          icon={<ChatBubbleOutlineIcon />}
          label="Comment"
          onClick={toggleComments}
        />
      </Stack>

      {/* COMMENTS */}
      {showComments && (
        <>
          <Divider />
          <Box px={2} pb={2}>
            <CommentSection post={post} refresh={refresh} />
          </Box>
        </>
      )}
    </Card>
  );
}

/* BUTTON */
function ButtonAction({ icon, label, onClick }) {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      sx={{
        cursor: "pointer",
        px: 2,
        py: 1,
        borderRadius: 2,
        transition: "0.2s",
        "&:hover": {
          background: "#f1f5f9",
        },
      }}
      onClick={onClick}
    >
      {icon}
      <Typography fontSize="14px">{label}</Typography>
    </Stack>
  );
}