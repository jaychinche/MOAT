import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../shared-theme/ColorModeIconDropdown";
import Sitemark from "./SitemarkIcon";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBarUser() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<{ isLoggedIn: boolean; userType?: string } | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

        console.log(token);
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUser({ isLoggedIn: true, userType: decodedToken.userType });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    } else {
      setUser(null);
    }
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
 
    navigate('/dashboard-user');
    setUser(null);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>

          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
            <Link to="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <Sitemark />
            </Link>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {user?.isLoggedIn && user?.userType === "admin" && (
                <>
                  <Button component={Link} to="/addemp" variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                    Add Employee
                  </Button>
                  <Button component={Link} to="/emplist" variant="text" color="info" size="small">
                    Monitor Employee
                  </Button>
                </>
              )}
              <Button component={Link} to="/dashboard" variant="text" color="info" size="small">
                About Us
              </Button>
              <Button component={Link} to="/dashboard" variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                Contact Us
              </Button>

            </Box>


          </Box>


          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1, alignItems: "center" }}>
            {user?.isLoggedIn ? (
              <Button variant="contained" size="small" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button component={Link} to="/sign-in" color="primary" variant="contained" size="small">
                Login
              </Button>
            )}
            <ColorModeIconDropdown />
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>


                {user?.isLoggedIn && user?.userType === "admin" && (
                  <MenuItem> <Button component={Link} to="/addemp" variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                    Add Employee
                  </Button> </MenuItem>

                )}
                {user?.isLoggedIn && user?.userType === "admin" && (
                  <MenuItem> <Button component={Link} to="/emplist" variant="text" color="info" size="small">
                    Monitor Employee
                  </Button></MenuItem>

                )}

                <MenuItem> <Button component={Link} to="/dashboard" variant="text" color="info" size="small">
                  About Us
                </Button>
                </MenuItem>
                <MenuItem>
                  <Button component={Link} to="/dashboard" variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                    Contact Us
                  </Button>
                </MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  {user?.isLoggedIn ? (
                    <Button color="error" variant="contained" fullWidth onClick={handleLogout}>
                      Logout
                    </Button>
                  ) : (
                    <Button component={Link} to="/sign-in" color="primary" variant="contained" fullWidth>
                      Login
                    </Button>
                  )}
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

