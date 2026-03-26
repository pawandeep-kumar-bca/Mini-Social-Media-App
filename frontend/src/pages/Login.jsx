import { useState } from "react";
import API from "../api/axios";
import {
  TextField,
  Button,
  Container,
  Stack,
  Typography,
  Paper,
  Link,
  Box,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

  
  const validate = () => {
    let temp = {};

    if (!form.email) temp.email = "Email required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      temp.email = "Invalid email";

    if (!form.password) temp.password = "Password required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  
  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      setSnackbar({
        open: true,
        message: "Login successful 🎉",
        type: "success",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
        console.log(err)
      setSnackbar({
        open: true,
        message: "Invalid credentials ❌",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        alignItems: isMobile ? "flex-start" : "center",
        pt: isMobile ? 6 : 0,
      }}
    >
      <Container maxWidth="xs" disableGutters={isMobile}>
        <Paper
          elevation={isMobile ? 0 : 8}
          sx={{
            p: isMobile ? 3 : 4,
            borderRadius: isMobile ? 0 : 3,
            width: "100%",
          }}
        >
          
          <Box textAlign="center" mb={3}>
            <Typography variant="h5" fontWeight="bold">
              Welcome Back 👋
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={1}>
              Login to continue
            </Typography>
          </Box>

          <Stack spacing={2}>
           
            <TextField
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

           
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              error={!!errors.password}
              helperText={errors.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            
            <Button
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.3,
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "none",
                background: "#2563eb",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              }}
              onClick={handleSubmit}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
          </Stack>

          
          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              Don’t have an account?{" "}
              <Link href="/signup" fontWeight="bold">
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>

     
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.type} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}