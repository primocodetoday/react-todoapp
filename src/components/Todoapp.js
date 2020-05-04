import React, { useState, useEffect } from 'react';
import AddTask from './AddTask/AddTask';
import styles from './ToDoApp.module.scss';
import TaskList from './TaskList/TaskList';

const ToDoApp = () => {
  const [state, setState] = useState([
    {
      id: 1,
      text: 'React Redux Practice',
      date: '2020-05-05',
      important: false,
      active: true,
      finishDate: null,
    },
    {
      id: 2,
      text: 'Vue Routing',
      date: '2020-05-10',
      important: false,
      active: true,
      finishDate: null,
    },
    {
      id: 3,
      text: 'Finish portfolio',
      date: '2020-05-15',
      important: true,
      active: true,
      finishDate: null,
    },
  ]);

  const localStorageAdd = (key, result) => {
    localStorage.setItem(key, JSON.stringify(result));
  };

  const handleChangeActive = (id) => {
    const prevState = [...state];
    prevState.map((task) => {
      if (task.id === id) {
        task.active = false;
        task.finishDate = new Date().getTime();
      }
      return true;
    });
    setState(() => prevState);
    localStorageAdd('data', prevState);
  };

  const handleDeleteTask = (id) => {
    const prevState = [...state];
    const result = prevState.filter((task) => task.id !== id);
    // zwraca wszystkie elementy które mają różne Id od przekazanego
    setState(() => result);
    localStorageAdd('data', result);
  };

  const addSingleTask = (text, date, important) => {
    const newTask = {
      id: state.length + 2,
      text,
      date,
      important,
      active: true,
      finishDate: null,
    };
    setState((prevState) => {
      const result = [...prevState, newTask];
      localStorageAdd('data', result);
      return result;
    });
    // sprawdzaj jakie dane masz w state. Używamy {} lub []
    return true;
  };

  // sync with localStorage
  useEffect(() => {
    const localStorageDrive = localStorage.getItem('data');
    if (localStorageDrive) {
      if (localStorageDrive !== JSON.stringify(state)) {
        setState(JSON.parse(localStorageDrive));
      }
    } else localStorageAdd('data', state);
  }, [state]);

  return (
    <div className={styles.mainWrapper}>
      <h2 className={styles.title}>Another To Do App</h2>
      <AddTask addSingleTask={addSingleTask} />
      <TaskList
        taskList={state}
        deleteTask={handleDeleteTask}
        changeActive={handleChangeActive}
      />
    </div>
  );
};

export default ToDoApp;
