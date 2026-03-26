import { useState } from "react";
import API from "../api/axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Stack
} from "@mui/material";

export default function CreatePost({ refresh }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("text", text);
    if (file) formData.append("image", file);

    await API.post("/posts", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setText("");
    setFile(null);
    refresh();
  };

  return (
    <Card sx={{ mt: 2, borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={2}>
          <TextField
            label="What's on your mind?"
            multiline
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Post 🚀
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}