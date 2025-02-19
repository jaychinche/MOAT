import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { styled, useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import AppTheme from "./shared-theme/AppTheme";
import AppAppBar from "./dashboardMain/components/AppAppBar";
import Footer from "./dashboardMain/components/Footer";
import { Alert, IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF1493"];
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#FF1493" : "#000",
  color: theme.palette.common.white,
  textTransform: "capitalize",
  marginBottom: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#FF69B4" : "#333",
  },
}));

export default function IndivEmpDetail() {
  const { email } = useParams();
  const theme = useTheme();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState("today");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState("success");

  const fetchEmployeeData = (type) => {
    setLoading(true);
    fetch(`https://moat-2.onrender.com/employee-admin/${email}/${type}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(
              errorData.error || "An error occurred. Please try again."
            );
          });
        }
        return response.json();
      })
      .then((data) => {
        setEmployeeData(data);
        setLoading(false);
      })
      .catch((error) => {
        setAlertMessage(error.message);
        setAlertType("error");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEmployeeData(reportType);
  }, [email, reportType]);

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBar />

      {alertMessage && (
        <Box sx={{ width: "50%", maxWidth: 600, mx: "auto", mt: 2 }}>
          <br></br>
          <br></br>
          <br></br> <br></br>
          <br></br>
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Container maxWidth="lg">
        {loading ? (
          <Typography variant="h5" align="center" mt={4}>
            Loading Employee Data...
          </Typography>
        ) : employeeData ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography variant="h4" align="center" gutterBottom>
                {employeeData.email}
              </Typography>
            </motion.div>

            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                {["today", "week", "month", "year"].map((type) => (
                  <StyledButton
                    key={type}
                    fullWidth
                    onClick={() => setReportType(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)} Report
                  </StyledButton>
                ))}
              </Grid>

              <Grid item xs={12} md={9}>
                <br></br>
                <Grid container spacing={2}>
                  {[
                    {
                      label: "Total Active Time",
                      value: employeeData.activeTime,
                      icon: "🕒",
                    },
                    {
                      label: "Work Time",
                      value: employeeData.workTime,
                      icon: "💻",
                    },
                    {
                      label: "Idle Time",
                      value: employeeData.idleTime,
                      icon: "🛌",
                    },
                    {
                      label: "Private Time",
                      value: employeeData.privateTime,
                      icon: "🔒",
                    },
                  ].map((card, index) => (
                    <Grid item xs={6} md={3} key={index}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      >
                        <Paper
                          elevation={3}
                          sx={{ padding: 2, textAlign: "center" }}
                        >
                          <Typography variant="h6" gutterBottom>
                            {card.icon} {card.label}
                          </Typography>
                          <Typography variant="body1">{card.value}</Typography>
                        </Paper>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>

                <Typography variant="h6" mt={4} gutterBottom>
                  Work's Top Applications (
                  {reportType.charAt(0).toUpperCase() + reportType.slice(1)})
                </Typography>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={employeeData.applications}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="percentage"
                        >
                          {employeeData.applications.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Paper>
                </motion.div>
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography variant="h5" align="center" mt={4}>
            Employee Data not found.
            <br></br>
            <br></br>
            <br></br> <br></br>
            <br></br>
            <br></br> <br></br>
            <br></br>
            <br></br> <br></br>
            <br></br>
            <br></br> <br></br>
            <br></br>
            <br></br> <br></br>
            <br></br>
            <br></br> <br></br>
            <br></br>
            <br></br>
          </Typography>
        )}
      </Container>
      <Footer />
    </AppTheme>
  );
}
