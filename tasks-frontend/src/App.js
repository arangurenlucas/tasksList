import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.css";
import Home from "./Components/Home";
import FoldersView from "./Components/FoldersView";
import TasksList from "./Components/TasksList";
import AddTask from "./Components/AddTask";
import EditTask from "./Components/EditTask";
import AddFolder from "./Components/AddFolder";

function App() {
  return (
    <div className="App">
      <div className="menu">
        <h1>Tasks List</h1>
        <nav className="nav-bar">
          <a href="/">Home</a>
        </nav>
      </div>
      <div className="routes">
        <Router>
          <Route exact path="/" component={Home} />
          <Route exact path="/folders" component={FoldersView} />
          <Route exact path="/folders/taskList/:id" component={TasksList} />
          <Route exact path="/folders/taskList/add/:id" component={AddTask} />
          <Route
            exact
            path="/folders/tasksList/edit/:id"
            component={EditTask}
          />
          <Route exact path="/folders/add" component={AddFolder} />
        </Router>
      </div>
    </div>
  );
}

export default App;
