import './App.css';
import { React, useRef, useState, useEffect } from 'react';

function App() {
  const [x, setx] = useState([]); // Tasks List
  const [isEditing, setIsEditing] = useState(false); // Edit
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState(""); // Message
  const [filter, setFilter] = useState("all"); // Filter tasks
  const inputRef = useRef();

  // localStorage 
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setx(JSON.parse(storedTasks));
    }
  }, []);

  //  update tasks in localStorage
  const updateLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const add = () => {
    const value = inputRef.current.value;

    const newTask = { completed: false, value };

    if (value) {
      const updatedTasks = [...x, newTask];
      setx(updatedTasks);
      updateLocalStorage(updatedTasks); // update localStorage
      inputRef.current.value = '';
    }
  };

  const itemDone = (index) => {
    x[index].completed = !x[index].completed;
    const updatedTasks = [...x];
    setx(updatedTasks);
    updateLocalStorage(updatedTasks); // update localStorage

    // show message after completion of task
    if (x[index].completed) {
      setMessage(" 👏أشطر كتكوت والله برافوو ");
      setTimeout(() => {
        setMessage(""); // hide message after 3 seconds
      }, 3000);
    }
  };

  const toDel = (index) => {
    const updatedTasks = [...x];
    updatedTasks.splice(index, 1);
    setx(updatedTasks);
    updateLocalStorage(updatedTasks); // update localStorage
  };

  const toEdit = (index) => {
    inputRef.current.value = x[index].value;
    setIsEditing(true);
    setEditingIndex(index);
  };

  const saveEdit = () => {
    const updatedValue = inputRef.current.value.trim();
    if (updatedValue && editingIndex !== null) {
      x[editingIndex].value = updatedValue;
      const updatedTasks = [...x];
      setx(updatedTasks);
      updateLocalStorage(updatedTasks); // update localStorage
      setIsEditing(false);
      setEditingIndex(null);
      inputRef.current.value = '';
    }
  };
 // getting the filter tasks based on the filter chosen
  const filteredTasks = x.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // if filter is all 
  });

  return (
    <div className="App">
      {/*  message appear after completion a task */}
      {message && <div className="message">{message}</div>}
      <h2> YourTo Do List 📝 </h2>
      <input ref={inputRef} placeholder="Enter a new Task" />
      <button className ="btn" onClick={isEditing ? saveEdit : add}>
        {isEditing ? 'Save' : 'Add'}
      </button>

      {/* filter buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active-filter" : ""}>
          All Tasks
        </button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active-filter" : ""}>
          Completed Tasks
        </button>
        <button onClick={() => setFilter("incomplete")} className={filter === "incomplete" ? "active-filter" : ""}>
          Incomplete Tasks
        </button>
      </div>

      <ul>
        {filteredTasks.map(({ value, completed }, index) => {
          return (
            <div className="div10" key={index}>
              <li
                className={completed ? 'diffStyle' : ''}
                onClick={() => itemDone(index)}
              >
                {value}
              </li>
              <span onClick={() => toEdit(index)}>✏️</span>
              <span onClick={() => toDel(index)}>❌</span>
            </div>
          );
        })}
      </ul>
      <p className="footer">Stay Productive, Stay On Track <br/> <span className="spano" >by Reem Radwan</span></p>
      
    </div>
  );
}

export default App;
