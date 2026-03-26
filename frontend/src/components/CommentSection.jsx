import { useState } from "react";
import API from "../api/axios";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Avatar,
  Box,
} from "@mui/material";

export default function CommentSection({ post, refresh }) {
  const [comment, setComment] = useState("");

  const handleComment = async () => {
    if (!comment.trim()) return;

    await API.post(`/posts/${post._id}/comments`, {
      text: comment,
    });

    setComment("");
    refresh();
  };

  return (
    <Stack spacing={2} sx={{ mt: 1 }}>
      {/* 🔹 ADD COMMENT */}
      <Stack direction="row" spacing={1}>
        <TextField
          size="small"
          fullWidth
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={handleComment}
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Post
        </Button>
      </Stack>

      {/* 🔹 COMMENT LIST */}
      <Stack spacing={1}>
        {post.comments.length === 0 && (
          <Typography fontSize="13px" color="text.secondary">
            No comments yet
          </Typography>
        )}

        {post.comments.map((c, i) => (
          <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
            <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>
              {c.user?.username?.[0]}
            </Avatar>

            <Box
              sx={{
                background: "#f1f5f9",
                px: 1.5,
                py: 1,
                borderRadius: 2,
              }}
            >
              <Typography fontSize="13px" fontWeight="bold">
                {c.user?.username}
              </Typography>

              <Typography fontSize="13px">
                {c.text}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}