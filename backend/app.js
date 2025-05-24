const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const dotenv = require('dotenv');
const authRoutes = require('./routes/userAuthRoute');
const nodemailer = require('nodemailer')


const  employeeAdminRoute=require('./routes/employeeAdminRoute')
const employeeUserRoute =require('./routes/employeeUserRoute');

const EmployeeActivity = require('./models/EmployeeActivity'); 
const EmployeeActivityWeek = require('./models/EmployeeActivityWeek'); 
const EmployeeActivityYear = require('./models/EmployeeActivityYear');
const EmployeeActivityMonth = require('./models/EmployeeActivityMonth');
const User = require('./models/User');
const isAdmin = require('./middleware/isAdmin');
const isLoggedIn=require('./middleware/isLoggedIn');


const cors = require("cors");
const bcrypt = require('bcrypt');

dotenv.config();
const app = express();  

const JWT_SECRET=process.env.JWT_SECRET;
app.use(
  session({
      secret:JWT_SECRET, 
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }, 
  })
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
require('dotenv').config();
app.use(express.json());
app.use(cookieParser()); 

const ORIGIN=process.env.ORIGIN;
app.use(cors({
  origin: "https://multi-user-activity-tracker.netlify.app",
  credentials: true,  
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization",'x-auth-token']
  
}));

app.use('/users', authRoutes);
//for Admin fetch the perticular employee inforamtion
app.use('/employee-admin',employeeAdminRoute);
//for Employee/User fetch the perticular employee inforamtion
app.use('/employee-user',isLoggedIn,employeeUserRoute);

app.get("/emplist",isLoggedIn,isAdmin, async (req, res) => {
  try {
    const Users = await User.find({}); // Fetch only the 'name' field
    res.json(Users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/addemp",async (req, res) => {
  try {
    const { username ,email, password } = req.body;
    const userType="user";
    if (!email || !password||!username) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

    // Create new employee
    const newUser = new User({
      email,
      password: hashedPassword,
      username, 
      userType
    });

     
    await newUser.save();
    // Email configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USERS,
        pass:process.env.PASS
      
      },
    });

    // Email details (only email & password included)
    const mailOptions = {
      from: "moat@gmail.com",
      to: email,
      subject: "Your Multi-OS Activity Tracker Account",
      text: `Dear Employee,

Your account has been successfully created for the Multi-OS Activity Tracker.

Below are your login credentials:

Email: ${email}
Password: ${password} (Please change your password after logging in)

Login here:[Click to Sign In](https://moat-glr5.vercel.app)  

To get started, please log in using the provided credentials.

If you have any questions, feel free to reach out.

Best regards,  
Multi-OS Activity Tracker Team`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Employee added, but email failed to send." });
      }
      console.log("Email sent:", info.response);
      res.status(201).json({ message: "Employee added successfully, email sent.", user: newUser });
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

//MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
async function main() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err.message);
    }
}
main();
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// extra code for saving data into database
// const
//  verifyAdmin = (req, res, next) => {
//   try {
//     const token = req.header("Authorization"); // Extract token from headers

//     if (!token) {
//       return res.status(403).json({ message: "Access denied. No token provided." });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

//     if (decoded.userType !== "admin") {
//       return res.status(403).json({ message: "Access denied. Admins only." });
//     }

//     req.user = decoded; // Store user info in request object
//     next(); // Move to the next middleware
//   } catch (error) {
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };
// app.post("/save", async (req, res) => {
//   try {
//     const newActivity = new EmployeeActivity(req.body); // Create a new document
//     await newActivity.save(); // Save to MongoDB
//     res.status(201).json({ message: "Data saved successfully" });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
// app.post("/saveweek", async (req, res) => {
//   try {
//     const newActivity = new EmployeeActivityWeek(req.body); // Create a new document
//     await newActivity.save(); // Save to MongoDB
//     res.status(201).json({ message: "Data saved successfully" });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
// app.post("/savemonth", async (req, res) => {
//   try {
//     const newActivity = new EmployeeActivityMonth(req.body); // Create a new document
//     await newActivity.save(); // Save to MongoDB
//     res.status(201).json({ message: "Data saved successfully" });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
// app.post("/saveyear", async (req, res) => {
//   try {
//     const newActivity = new EmployeeActivityYear(req.body); // Create a new document
//     await newActivity.save(); // Save to MongoDB
//     res.status(201).json({ message: "Data saved successfully" });
//   } catch (error) {
//     console.error("Error saving data:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });
