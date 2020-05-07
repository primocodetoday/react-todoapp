import React, { useState, useEffect } from 'react';
import AddTask from './AddTask/AddTask';
import styles from './ToDoApp.module.scss';
import TaskList from './TaskList/TaskList';
import startData from './store';

const ToDoApp = () => {
  const [itemList, setItemList] = useState(startData);

  const localStorageAdd = (key, result) => {
    localStorage.setItem(key, JSON.stringify(result));
  };

  const handleChangeActive = (id) => {
    const prevState = [...itemList];
    prevState.map((task) => {
      if (task.id === id) {
        task.active = false;
        task.finishDate = new Date().getTime();
      }
      return true;
    });
    setItemList(() => prevState);
    localStorageAdd('data', prevState);
  };

  const handleDeleteTask = (id) => {
    const prevState = [...itemList];
    const result = prevState.filter((task) => task.id !== id);
    // zwraca wszystkie elementy które mają różne Id od przekazanego
    setItemList(() => result);
    localStorageAdd('data', result);
  };

  const addSingleTask = (text, date, important) => {
    const newTask = {
      id: itemList.length + 2,
      text,
      date,
      important,
      active: true,
      finishDate: null,
    };
    setItemList((prevState) => {
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
      if (localStorageDrive !== JSON.stringify(itemList)) {
        setItemList(JSON.parse(localStorageDrive));
      }
    }
    localStorageAdd('data', itemList);
  }, [itemList]);

  return (
    <div className={styles.mainWrapper}>
      <h2 className={styles.appTitle}>Another To Do App</h2>
      <AddTask addSingleTask={addSingleTask} />
      <TaskList
        taskList={itemList}
        deleteTask={handleDeleteTask}
        changeActive={handleChangeActive}
      />
    </div>
  );
};

export default ToDoApp;
