const express = require("express");
const router = express.Router();
const { tasks } = require("../data");
const { verifyToken, adminOnly } = require("../middleware/auth");

// GET /tasks - admin: সব task, user: শুধু নিজের task
router.get("/", verifyToken, (req, res) => {
  if (req.user.role === "admin") {
    return res.status(200).json(tasks);
  }
  // user হলে শুধু নিজের task
  const myTasks = tasks.filter((t) => t.assignedTo === req.user.id);
  res.status(200).json(myTasks);
});

// GET /tasks/:id - admin: যেকোনো task, user: শুধু নিজের
router.get("/:id", verifyToken, (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));

  if (!task) return res.status(404).json({ message: "Task not found." });

  if (req.user.role !== "admin" && task.assignedTo !== req.user.id) {
    return res.status(403).json({ message: "Access denied. Not your task." });
  }

  res.status(200).json(task);
});

// POST /tasks - শুধু admin
router.post("/", verifyToken, adminOnly, (req, res) => {
  const { title, description, assignedTo } = req.body;

  if (!title || !assignedTo) {
    return res.status(400).json({ message: "Title and assignedTo (user id) are required." });
  }

  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description: description || "",
    status: "pending",
    assignedTo,
  };

  tasks.push(newTask);
  res.status(201).json({ message: "Task created", task: newTask });
});

// PUT /tasks/:id - শুধু admin
router.put("/:id", verifyToken, adminOnly, (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));

  if (!task) return res.status(404).json({ message: "Task not found." });

  const { title, description, status, assignedTo } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (assignedTo !== undefined) task.assignedTo = assignedTo;

  res.status(200).json({ message: "Task updated", task });
});

// DELETE /tasks/:id - শুধু admin
router.delete("/:id", verifyToken, adminOnly, (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ message: "Task not found." });

  const deleted = tasks.splice(index, 1);
  res.status(200).json({ message: "Task deleted", task: deleted[0] });
});

module.exports = router;