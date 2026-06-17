const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Root
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("\n--- Demo Users ---");
  console.log("Admin  : admin@task.com  / admin123");
  console.log("User 1 : rahim@task.com  / rahim123");
  console.log("User 2 : karim@task.com  / karim123");
  console.log("User 3 : sadia@task.com  / sadia123");
  console.log("User 4 : nadia@task.com  / nadia123");
});