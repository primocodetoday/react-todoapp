import React from 'react';
import PropTypes from 'prop-types';
import { List, Typography } from '@material-ui/core';
import { Task } from '..';

const TaskList = ({ taskList, changeActive, deleteTask }) => {
  const activeTasks = taskList.filter((task) => task.active);
  const doneTasks = taskList.filter((task) => !task.active);

  activeTasks.sort((a, b) => {
    a = a.text.toLowerCase();
    b = b.text.toLowerCase();
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  doneTasks.sort((a, b) => b.finishDate - a.finishDate);

  const activeList = activeTasks.map((task) => (
    <Task
      key={task.id}
      item={task}
      changeActive={changeActive}
      deleteTask={deleteTask}
    />
  ));

  const doneList = doneTasks.map((task) => (
    <Task
      key={task.id}
      item={task}
      deleteTask={deleteTask}
      changeActive={changeActive}
    />
  ));

  return (
    <List>
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Tasks to be done ({activeList.length})
        </Typography>
        {activeList.length > 0 ? (
          activeList
        ) : (
          <p>Nothing to do. Go for coffee.</p>
        )}
      </div>
      <div>...</div>
      <div>
        <Typography variant="h5" align="center" gutterBottom>
          Tasks done ({doneList.length})
        </Typography>
        {doneList.length > 5 && (
          <p>The list contains the last 5 completed tasks</p>
        )}
        {doneList.slice(0, 5)}
      </div>
    </List>
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
