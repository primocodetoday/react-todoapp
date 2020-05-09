import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task/Task';
import styles from './TaskList.module.scss';

const TaskList = ({ taskList, changeActive, deleteTask }) => {
  const activeList = taskList
    .sort((a, b) => {
      a = a.text.toLowerCase();
      b = b.text.toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })
    .filter((task) => task.active)
    .map((task) => (
      <Task
        key={task.id}
        item={task}
        changeActive={changeActive}
        deleteTask={deleteTask}
      />
    ));

  const doneList = taskList
    .filter((task) => !task.active)
    .sort((a, b) => b.finishDate - a.finishDate)
    .map((task) => (
      <Task
        key={task.id}
        item={task}
        deleteTask={deleteTask}
        changeActive={changeActive}
      />
    ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.todoList}>
        <div className={styles.line}> </div>
        <h4>Tasks to be done ({activeList.length})</h4>
        {activeList.length > 0 ? (
          activeList
        ) : (
          <p>Nothing to do. Go for coffee.</p>
        )}
      </div>
      <div className={styles.line}> </div>
      <div className={styles.doneList}>
        <h4>Tasks done ({doneList.length})</h4>
        {doneList.length > 5 && (
          <p>The list contains the last 5 completed tasks</p>
        )}
        {doneList.slice(0, 5)}
      </div>
    </div>
  );
};

TaskList.propTypes = {
  taskList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      important: PropTypes.bool,
      active: PropTypes.bool,
      finishDate: PropTypes.any,
    }),
  ).isRequired,
  changeActive: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskList;
