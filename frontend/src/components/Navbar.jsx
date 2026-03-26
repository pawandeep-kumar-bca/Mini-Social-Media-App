import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,

} from "@mui/material";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
   <AppBar
  elevation={0}
  sx={{
    background: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
  }}
>
      <Toolbar
        sx={{
          maxWidth: 1000,
          width: "100%",
          margin: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/*  Logo */}
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#2563eb",
            cursor: "pointer",
          }}
        >
          SocialApp 🚀
        </Typography>

        {/*  Right Side */}
        <Box display="flex" alignItems="center" gap={2}>
         

          {/* Logout Button */}
          <Button
            onClick={logout}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "999px",
              px: 2,
              color: "#ef4444",
              "&:hover": {
                background: "#fee2e2",
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}