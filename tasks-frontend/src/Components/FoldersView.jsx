import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";

export default function FoldersView() {
  const history = useHistory();
  const [folders, setFolders] = useState({});

  const getFolders = async () => {
    try {
      const answer = await axios.get(
        "https://taskslist-api.herokuapp.com/folders"
      );
      setFolders(answer.data);
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };

  useEffect(() => {
    getFolders();// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeFolder = async (idToRemove) => {
    try {
      await axios.delete(
        "https://taskslist-api.herokuapp.com/folders/" + idToRemove
      );
      getFolders();
    } catch (e) {
      swal("Error", e.response.data, "error");
    }
  };

  const redirectionNewFolder = () => {
    history.push("/folders/add");
  };
  return (
    <>
      <ul>
        {folders && folders.length > 0
          ? folders.map((folder) => (
              <li key={folder.id}>
                {folder.name}{" "}
                <Link to={"/folders/taskList/" + folder.id}>View items</Link>{" "}
                <Link onClick={() => removeFolder(folder.id)}>Remove</Link>
              </li>
            ))
          : null}
      </ul>
      <label>
        New Folder <button onClick={redirectionNewFolder}>Add</button>
      </label>
    </>
  );
}
