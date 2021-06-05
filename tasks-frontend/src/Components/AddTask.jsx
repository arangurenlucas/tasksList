import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
export default function AddTask(props) {
  const params = useParams();
  const history = useHistory();
  const [form, setForm] = useState({});
  const [folder, setFolder] = useState({});

  const getFolders = async () => {
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
    getFolders(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTaskName = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.name = e.target.value;
    newForm.folder_id = params.id;
    setForm(newForm);
  };

  const handleSave = async () => {
    try {
      await axios.post("https://taskslist-api.herokuapp.com/tasks", form);
      history.push("/folders/taskList/" + params.id);
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };

  const handleCancel = () => {
    history.push("/folders/taskList/" + params.id);
  };

  return (
    <div>
      <h2>
        Adding task to '{folder && folder.length > 0 ? folder[0].name : null}'
      </h2>
      <div className="addTask-form">
        <label>Name</label>
        <input
          type="text"
          value={form.name}
          placeholder="Task name"
          onChange={handleTaskName}
          required
        ></input>
        <button className="btn-save" onClick={handleSave}>
          Save
        </button>
        <button className="btn-cancel" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
