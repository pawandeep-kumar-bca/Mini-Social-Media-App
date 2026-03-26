import { useEffect, useState } from "react";
import API from "../api/axios";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import Navbar from "../components/Navbar";
import {
  Container,
  Button,
  Box,
  Typography,
  CircularProgress,
  Skeleton,
} from "@mui/material";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
 useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
   window.location.replace("/login");
  }
}, []);
  const fetchPosts = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await API.get(`/posts?page=${pageNum}&limit=5`);

      
      setPosts((prev) =>
        pageNum === 1 ? res.data.posts : [...prev, ...res.data.posts],
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
    fetchPosts(page);
  }, [page]);

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #f8fafc, #eef2f7)",
        minHeight: "100vh",
      }}
    >
      {/*  Navbar */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Navbar />
      </Box>

      {/*  Feed */}
      <Container
        maxWidth="sm"
        sx={{
          py: 3,
          pt: 13,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/*  Header Card */}
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            background: "#fff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Your Feed
          </Typography>
          <Typography variant="body2" color="text.secondary">
            See what’s happening in your network
          </Typography>
        </Box>

        {/*  Create Post */}
        <Box
          sx={{
            p: 2,
            borderRadius: 3,
            background: "#fff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <CreatePost refresh={() => fetchPosts(1)} />
        </Box>

        {/*  Posts */}
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Empty state */}
          {posts.length === 0 && !loading && (
            <Box textAlign="center" mt={4}>
              <Typography fontWeight="bold">No posts yet</Typography>
              <Typography color="text.secondary">
                Start by creating your first post 🚀
              </Typography>
            </Box>
          )}

          {/* Skeleton loading */}
          {loading &&
            Array.from(new Array(3)).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={120}
                sx={{ borderRadius: 3 }}
              />
            ))}

          {/* Actual posts */}
          {posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              refresh={() => fetchPosts(page)}
            />
          ))}
        </Box>

        {/*  Load More */}
        <Box mt={3} textAlign="center">
          <Button
            variant="contained"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              background: "#2563eb",
              boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
              "&:hover": {
                background: "#1d4ed8",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={22} sx={{ color: "#fff" }} />
            ) : (
              "Load More"
            )}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
