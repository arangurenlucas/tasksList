import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export default function AddFolder() {
  const history = useHistory();

  const [form, setForm] = useState({});

  const handleFolderName = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.name = e.target.value;
    setForm(newForm);
  };

  const handleCancel = () => {
    history.push("/folders");
  };

  const handleSave = async () => {
    try {
      await axios.post("https://taskslist-api.herokuapp.com/folders/", form);
      history.push("/folders");
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };
  return (
    <div>
      <h2>Adding new folder</h2>
      <div className="addFolder-form">
        <label>Name</label>
        <input
          type="text"
          value={form.name}
          placeholder="Folder name"
          onChange={handleFolderName}
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
