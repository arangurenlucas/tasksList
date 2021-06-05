const { Pool } = require("pg");

const pool = new Pool({
  user: "ekohawwntaiord",
  host: "ec2-23-23-164-251.compute-1.amazonaws.com",
  password: "8cac35c5cf0f78a5d10e97d5078cd7210e0d8283c75fbe133e62376adbaa0b6f",
  database: "d6beh47gjrf8v4",
  port: "5432",
  ssl: { rejectUnauthorized: false },
});

//folder
const getFolder = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM folder");
    res.send(response.rows);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const getFolderById = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM folder WHERE id=$1", [
      req.params.id,
    ]);
    if (!response.rows.length) throw new Error("Folder not found");
    res.send(response.rows);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

const postNewFolder = async (req, res) => {
  try {
    const name = req.body.name.toUpperCase().trim();
    if (!name) throw new Error("Name is required");

    // validation
    const validation = await pool.query(
      "SELECT * FROM folder WHERE name = $1",
      [name]
    );
    if (validation.rows.length > 0)
      throw new Error("Folder name already exist");
    const response = await pool.query("INSERT INTO folder (name) VALUES ($1)", [
      name,
    ]);
    res.send("New folder successfully added");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const deleteFolder = async (req, res) => {
  try {
    //validation
    const validation = await pool.query("SELECT * FROM folder WHERE id = $1", [
      req.params.id,
    ]);
    if (!validation.rows.length > 0) throw new Error("Folder not found");
    const response = await pool.query("DELETE FROM folder WHERE id = $1", [
      req.params.id,
    ]);
    res.send("Successfully deleted");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

//tasks
//getTask
const getTask = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM tasks");
    res.send(response.rows);
  } catch (e) {
    res.status(400).send(e.message);
  }
};
//getTask by id
const getTaskById = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM tasks WHERE id=$1", [
      req.params.id,
    ]);
    if (!response.rows.length > 0) throw new Error("Task not found");
    res.send(response.rows);
  } catch (e) {
    res.status(404).send(e.message);
  }
};
//newTask
const postNewTask = async (req, res) => {
  try {
    if (!req.body.name || !req.body.folder_id)
    throw new Error("Name and folder are required");
    const name = req.body.name.toUpperCase().trim();
    //validation
    const validationName = await pool.query(
      "SELECT * FROM tasks WHERE name = $1",
      [name]
    );
    if (validationName.rows.length > 0)
      throw new Error("Task name already exists");

    const validationFolder = await pool.query(
      "SELECT * FROM folder WHERE id = $1",
      [req.body.folder_id]
    );
    if (!validationFolder.rows.length > 0)
      throw new Error("Cant find the selected folder");
    //post sentence
    const response = await pool.query(
      "INSERT INTO tasks (name, folder_id) VALUES ($1, $2)",
      [name, req.body.folder_id]
    );
    res.send("Task successfully added");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

//Edit task
const putTask = async (req, res) => {
  try {
    const name = req.body.name.toUpperCase().trim();
    if (!name) throw new Error("Name is required");
    //validation
    const validation = await pool.query("SELECT * FROM tasks WHERE id=$1", [
      req.params.id,
    ]);
    if (!validation.rows.length > 0) throw new Error("Task does not exist");
    const response = await pool.query(
      "UPDATE tasks SET name = $1 WHERE id = $2",
      [name, req.params.id]
    );

    res.send("Task updated successfully");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// Update completed task column

const completedTask = async (req, res) => {
  try {
    const validation = await pool.query("SELECT * FROM tasks WHERE id=$1", [
      req.params.id,
    ]);
    if (!validation.rows.length > 0) throw new Error("Task not found");
    const response = await pool.query(
      "UPDATE tasks SET completed = $1 WHERE id = $2",
      [req.body.completed, req.params.id]
    );

    res.send("Task Updated");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

//delete task
const deleteTask = async (req, res) => {
  try {
    //validation
    const validation = await pool.query("SELECT * FROM tasks WHERE id = $1", [
      req.params.id,
    ]);
    if (!validation.rows.length > 0) throw new Error("Task not found");

    const response = await pool.query("DELETE FROM tasks WHERE id = $1", [
      req.params.id,
    ]);
    res.send("Task successfully deleted");
  } catch (e) {
    res.status(404).send(e.message);
  }
};

module.exports = {
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
};
