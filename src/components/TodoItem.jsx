import { useContext, useState, useEffect } from "react";
import { v4 } from "uuid";
import Form from "./Form";
import IconButton from "@mui/material/IconButton";
import { ContainerTodo } from "../styles/ContainerTodo";
import { Tasks } from "../styles/Tasks";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ThemeContext, ThemeProvider } from "../context/ThemeContext";

const TodoItem = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if(localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"))
      setTasks(storedList)
    }
  }, [])

  const addTask = (title, category) => {
    const newTask = [
      ...tasks,
      {
        title,
        id: v4(),
        category,
        isComplete: false,
      },
    ];
    setTasks(newTask);
    localStorage.setItem("localTasks", JSON.stringify(newTask))
  };

  const deleteTask = (id) => {
    const newTasks = [...tasks];
    const filterTasks = newTasks.filter((newTask) =>
      newTask.id != id ? newTask : null
    );
    setTasks(filterTasks);
    localStorage.setItem("localTasks", JSON.stringify(filterTasks))
  };

  const completeTask = (id) => {
    const newTasks = [...tasks]
    newTasks.map((newTask) => newTask.id === id ? (newTask.isComplete = !newTask.isComplete) : newTask)
    setTasks(newTasks) 
    localStorage.setItem("localTasks", JSON.stringify(newTasks))
  }

  const {theme, toggleTheme} = useContext(ThemeContext)

  return (
    <div> 
      <p>Tema:{theme}</p>
      <button onClick={toggleTheme}>Clique</button>
      <Form addTask={addTask} />
      <div>
        {tasks.map((task) => (
          <ContainerTodo key={task.id}>
            <Tasks style={{ textDecoration: task.isComplete ? "line-through" : "" }}>
              <p>{task.title}</p>
              <p>({task.category})</p>
            </Tasks>
            <div style={{ display: "flex" }}>
              <IconButton aria-label="checked" onClick={() => completeTask(task.id)}>
                <CheckCircleOutlineIcon fontSize="large" />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => deleteTask(task.id)}
              >
                <DeleteIcon fontSize="large" style={{ cursor: "pointer" }} />
              </IconButton>
            </div>
          </ContainerTodo>
        ))}
      </div>
    </div>
  );
};

export default TodoItem;
