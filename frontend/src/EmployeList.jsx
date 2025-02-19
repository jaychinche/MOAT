import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import AppTheme from "./shared-theme/AppTheme";
import AppAppBar from "./dashboardMain/components/AppAppBar";
import Footer from "./dashboardMain/components/Footer";

export default function EmployeeListPage(props) {
  const [employees, setEmployees] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    fetch("https://moat-2.onrender.com/emplist", {
      method: "GET",
      headers: {
        'x-auth-token': token, 
      },
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        return response.json();
      })
      .then((data) => {
        const filteredEmployees = data.filter((user) => user.userType !== "admin");
        setEmployees(filteredEmployees);
        setAlertMessage("Employee list loaded successfully!");
        setAlertType("success");
      })
      .catch((error) => {
        setAlertMessage(error.message || "An error occurred. Please try again.");
        setAlertType("error");
      });
  }, []);

  const handleMonitorClick = (email) => {
    navigate(`/indiv-emp-detail/${email}`);
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <br /><br /><br /><br></br>

      <Container maxWidth="md">
        {/* Alert Message */}
        {alertMessage && (
          <Box sx={{ width: "50%", maxWidth: 600, mx: "auto", mb: 2 }}>
            <br></br>
            <Alert
              variant="filled"
              severity={alertType}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setAlertMessage(null)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            >
              {alertMessage}
            </Alert>
          </Box>
        )}

        {/* Heading with animation */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <br /><br />
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
            Employee Roster
          </Typography>
        </motion.div>

        {/* Employee List Section */}
        <Grid container spacing={3} mt={2}>
          {employees.length > 0 ? (
            employees.map((user, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: index * 0.1 }}>
                  <Card sx={{ backgroundColor: "#fff", borderRadius: 2, boxShadow: 3, transition: "0.3s", "&:hover": { boxShadow: 6 } }}>
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#FF1493" }}>
                        Employee: {index + 1}
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {user.username}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
                        {user.email}
                      </Typography>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button variant="contained" fullWidth sx={{ backgroundColor: "#000", color: "#fff", "&:hover": { backgroundColor: "#FF1493" } }} onClick={() => handleMonitorClick(user.email)}>
                          Monitor
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))
          ) : (
            <Typography textAlign="center" sx={{ padding: 2, width: "100%" }}>
              No employees found.
            </Typography>
          )}
        </Grid>
      </Container>
      <br /><br /><br /><br></br>
      <br /><br /><br /><br></br>

      <Footer />
    </AppTheme>
  );
}
