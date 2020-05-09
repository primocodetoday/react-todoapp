import React from 'react';
import PropTypes from 'prop-types';
import styles from './Task.module.scss';

const Task = ({ item, changeActive, deleteTask }) => {
  const { id, text, date, important, active, finishDate } = item;

  const finish = new Date(finishDate).toLocaleDateString();

  return (
    <div className={styles.task}>
      <p
        style={
          important
            ? {
                color: 'orange',
                fontWeight: '700',
              }
            : null
        }
        className={styles.taskText}
      >
        {text}
      </p>
      <p className={styles.taskDate}>
        {finish !== '1.01.1970' ? finish : date}
      </p>
      {active && (
        <button
          type="button"
          onClick={() => changeActive(id)}
          className={styles.doneButton}
        >
          Done
        </button>
      )}
      <button
        type="button"
        onClick={() => deleteTask(id)}
        className={styles.deleteButton}
      >
        X
      </button>
    </div>
  );
};

Task.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    important: PropTypes.bool,
    active: PropTypes.bool,
    finishDate: PropTypes.any,
  }).isRequired,
  changeActive: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
