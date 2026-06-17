const bcrypt = require("bcryptjs");

// Demo users (password hashed)
const users = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@task.com",
    password: bcrypt.hashSync("admin123", 8),
    role: "admin",
  },
  {
    id: 2,
    name: "Rahim Khan",
    email: "rahim@task.com",
    password: bcrypt.hashSync("rahim123", 8),
    role: "user",
  },
  {
    id: 3,
    name: "Karim Hossain",
    email: "karim@task.com",
    password: bcrypt.hashSync("karim123", 8),
    role: "user",
  },
  {
    id: 4,
    name: "Sadia Islam",
    email: "sadia@task.com",
    password: bcrypt.hashSync("sadia123", 8),
    role: "user",
  },
  {
    id: 5,
    name: "Nadia Akter",
    email: "nadia@task.com",
    password: bcrypt.hashSync("nadia123", 8),
    role: "user",
  },
];

// Demo tasks
let tasks = [
  { id: 1, title: "Design homepage", description: "Create UI mockup", status: "pending", assignedTo: 2 },
  { id: 2, title: "Fix login bug", description: "Auth issue on mobile", status: "in-progress", assignedTo: 3 },
  { id: 3, title: "Write unit tests", description: "Cover auth module", status: "pending", assignedTo: 4 },
];

module.exports = { users, tasks };