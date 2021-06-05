import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function EditTask(props) {
  const params = useParams();
  const history = useHistory();
  const [form, setForm] = useState({});
  const [task, setTask] = useState({});

  const getTask = async () => {
    try {
      const answer = await axios.get(
        "https://taskslist-api.herokuapp.com/tasks/" + params.id
      );
      setTask(answer.data);
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };

  useEffect(() => {
    getTask();// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeName = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.name = e.target.value;
    setForm(newForm);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        "https://taskslist-api.herokuapp.com/tasks/" + params.id,
        form
      );
      history.push('/folders/taskList/'+task[0].folder_id)
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };

  const handleCancel = ()=> {
      history.push('/folders/taskList/'+task[0].folder_id)
  }

  return (
    <div>
      <h2>Editing Task "{task && task.length > 0 ? task[0].name : null}"</h2>
      <input
        type="text"
        onChange={handleChangeName}
        placeholder={task && task.length > 0 ? task[0].name : null}
      ></input>
      <button onClick={handleSave}>Save</button>{" "}
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}
