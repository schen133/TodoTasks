import styles from "./styles.module.css";
import { useState } from "react";
// 1) A check square box for checking up todo items
//    rather than deleting them when click "X"
// 2) Delete the items when double clicking todo items
// 3) If square box is not checked and user wants to double
//    click and delete. It will prompt a box that ask user
//    if they are sure they want to delete it before completing

export default function Todos() {
  //Hooks
  const [todos, setTodos] = useState([]);
  //todos is the variable, and setTodos will be the setFunction
  //useState([]) initializes todos as a Empty array
  const [input, setInput] = useState("");
  //input is the variable we name
  //setInput is the function that updates input
  //we call useState("") to initialize input to ""
  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = () => {
    setInput("");
    setTodos([...todos, { input, id: crypto.randomUUID() }]);
  };

  const handleDelete = (targetId) => {
    setTodos(todos.filter((todo) => targetId !== todo.id));
  };

  return (
    <div className={styles.todo_container}>
      <h1>Tasks</h1>
      <input
        value={input}
        onChange={handleInput}
        placeholder="enter my task..."
      />
      <button
        className={styles.submit_button}
        disabled={input === ""}
        onClick={handleSubmit}
      >
        Submit
      </button>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} handleDelete={handleDelete} id={todo.id}>
            {todo.input}
          </TodoItem>
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ children, handleDelete, id }) {
  const [completed, setCompleted] = useState(false);
  const handleDoubleClick = () => {
    //if completed === false, this will trigger
    if (!completed) {
      if (
        window.confirm(
          "This todo is not completed, do you still want to delete it?"
        )
      ) {
        handleDelete(id);
      }
    } else {
      handleDelete(id);
    }
  };

  const handleCheck = () => {
    setCompleted(!completed);
  };

  return (
    <li
      onDoubleClick={handleDoubleClick}
      className={styles.todo_item_container}
    >
      {/* {completed ? <s>{children}</s> : children} */ children}
      <button
        className={
          completed ? styles.todo_check_button : styles.todo_uncheck_button
        }
        // className={styles.todo_check_button}
        onClick={() => handleCheck(id)}
      >
        {" "}
        {completed ? "✓" : ""}
      </button>
    </li>
  );
}
