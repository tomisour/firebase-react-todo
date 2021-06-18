import { FormControl, List } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { db } from "./firebase";
import { AddToPhotos } from "@material-ui/icons";
import TaskItem from "./TaskItem";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: "auto",
    width: "40%",
  },
});

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");
  const classses = useStyles();
  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);
  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    db.collection("tasks").add({ title: input });
    setInput("");
  };

  return (
    <div className={styles.app__root}>
      <h1>Todo APP by React</h1>
      <br />
      <FormControl>
        <TextField
          className={classses.field}
          label="new Task ?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInput(e.target.value);
          }}
        />
      </FormControl>
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotos />
      </button>

      <List className={classses.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;