import React, { useState } from 'react';
import AddTask from './AddTask/AddTask';
import TaskList from './TaskList/TaskList';
import store from './store';

const ToDoApp = () => {
  const [itemList, setItemList] = useState(store);

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
  };

  const handleDeleteTask = (id) => {
    const prevState = [...itemList];
    const result = prevState.filter((task) => task.id !== id);
    // zwraca wszystkie elementy które mają różne Id od przekazanego
    setItemList(() => result);
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
      return result;
    });
    return true;
  };

  return (
    <div className="container">
      <header className="box">
        <h3 className="title is-3 has-text-centered">Another To Do App</h3>
      </header>
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
