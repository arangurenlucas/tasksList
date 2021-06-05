import React, { useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function TasksList(props) {
  const history = useHistory();
  const params = useParams();
  const [tasks, setTasks] = useState({});
  const [folder, setFolder] = useState();

  const getTasks = async () => {
    try {
      const answer = await axios.get(
        "https://taskslist-api.herokuapp.com/tasks/"
      );
      const filterTasks = answer.data;
      setTasks(filterTasks.filter((item) => item.folder_id == params.id));
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };
  const getFolder = async () => {
    try {
      const answer = await axios.get(
        "https://taskslist-api.herokuapp.com/folders/" + params.id
      );
      setFolder(answer.data);
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };
  useEffect(() => {
    getTasks();// eslint-disable-next-line react-hooks/exhaustive-deps
    getFolder();// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redirectionNewTask = () => {
    history.push("/folders/taskList/add/" + params.id);
  };
  const handleDelete = async (idToRemove) => {
    try {
      await axios.delete(
        "https://taskslist-api.herokuapp.com/tasks/" + idToRemove
      );
      getTasks();
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };

  return (
    <div>
      <h2>Folder - {folder && folder.length > 0 ? folder[0].name : null}</h2>
      <ul>
        {tasks && tasks.length > 0
          ? tasks.map((item) => (
              <li key={item.id}>
                <input type="checkbox" value={item.completed} />
                {item.name}{" "}
                <Link className="btn-editTask" to={"/folders/tasksList/edit/" + item.id}>
                  Edit
                </Link>{" "}
                <Link onClick={() => handleDelete(item.id)}>
                  Remove
                </Link>
              </li>
            ))
          : null}
      </ul>
      <label>
        New Task <button onClick={redirectionNewTask}>Add</button>
      </label>
    </div>
  );
}
