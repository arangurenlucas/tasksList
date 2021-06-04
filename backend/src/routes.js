const { Router } = require("express");
const router = Router();

const {
  getFolder,
  getFolderById,
  postNewFolder,
  deleteFolder,
  getTask,
  getTaskById,
  postNewTask,
  putTask,
  completedTask,
  deleteTask,
} = require("./controllers");

router.get("/folders", getFolder);
router.get("/folders/:id", getFolderById);
router.post("/folders", postNewFolder);
router.delete("/folders/:id", deleteFolder);

router.get("/tasks", getTask);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", postNewTask);
router.put("/tasks/:id", putTask);
router.put("/tasks/completed/:id", completedTask);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
