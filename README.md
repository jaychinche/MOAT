# Multi-OS Activity Tracker

The Multi-OS Activity Tracker is a real-time productivity monitoring tool designed to help HR and managers (Admins) track employee activity across three categories: **Work**, **Time**, and **Idle**. This system provides insights into employee productivity through an interactive dashboard.

# Visual Output

<img width="1440" alt="Screenshot 2025-05-24 at 8 56 28 AM" src="https://github.com/user-attachments/assets/590b77fb-302e-4983-87bb-90d14d4129d0" />


<img width="1440" alt="Screenshot 2025-05-24 at 8 56 44 AM" src="https://github.com/user-attachments/assets/a8d65f28-76cb-4a18-bd17-62cd6b0aab83" />

<img width="1440" alt="Screenshot 2025-05-24 at 8 57 37 AM" src="https://github.com/user-attachments/assets/a0db5487-1528-4afc-a997-14e21e4c1735" />


<img width="1440" alt="Screenshot 2025-05-24 at 8 57 50 AM" src="https://github.com/user-attachments/assets/250ff782-3e2a-4adf-8e73-e1b412975c80" />


<img width="1440" alt="Screenshot 2025-05-24 at 8 57 56 AM" src="https://github.com/user-attachments/assets/35bd2f4e-27d1-4a19-8b71-3eabf55f31a2" />





## 👥 User Roles
### 👨‍💼 Admin (HR/Manager)
- View real-time activity logs of all employees.
- Analyze productivity trends and time usage.
- Access a role-based dashboard with filters and analytics.

### 👨‍💻 Employee (User)
- Activity is automatically tracked and stored.
- Can view personal daily activity summaries only.

## 🚀 How It Works

### 🔹 Step 1: Activity Tracking
- Tracks system usage:
  - **Work**: Time spent on productive apps.
  - **Time**: Overall system usage duration.
  - **Idle**: Time when the system is inactive.
- Sends real-time data to **MongoDB**.

### 🔹 Step 2: Backend Fetching
- Backend built with **Node.js** and **Express.js**.
- Fetches and processes data from MongoDB.

### 🔹 Step 3: Frontend Display
- Frontend built with **HTML, CSS, JavaScript, Bootstrap**.
- Admins get:
  - Graphs and metrics.
  - Real-time logs of employee activity.
  - No need to refresh the page for updates.

## 🔑 Key Features

- ✅ Real-Time Activity Monitoring  
- ✅ Role-Based Dashboards (Admin/User)  
- ✅ Live Data Updates Without Refresh  
- ✅ Interactive and Intuitive UI  
- ✅ MongoDB for Scalable Data Handling

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|--------------------------|
| Frontend   | HTML, CSS, JavaScript, Bootstrap |
| Backend    | Node.js, Express.js      |
| Database   | MongoDB                  |

## 📷 Demo

 ## Demo link :https://multi-user-activity-tracker.netlify.app/

> Replace the above demo links with your actual screenshots hosted on GitHub, Imgur, or another image service.

## 📦 Installation

```bash
git clone https://github.com/your-username/multi-os-activity-tracker.git
cd multi-os-activity-tracker
npm install
npm start
