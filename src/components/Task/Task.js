import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ item, changeActive, deleteTask }) => {
  const { id, text, date, important, active, finishDate } = item;

  const finish = new Date(finishDate).toLocaleDateString();

  return (
    <div className="tile is-parent">
      <div className="tile is-child notification is-primary">
        <p
          style={
            important
              ? {
                  color: 'orange',
                  fontWeight: '700',
                }
              : null
          }
        >
          {text}
        </p>
        <p>{finish !== '1.01.1970' ? finish : date}</p>
        {active && (
          <button
            type="button"
            onClick={() => changeActive(id)}
            className="button is-link"
          >
            Done
          </button>
        )}
        <button type="button" onClick={() => deleteTask(id)} className="delete">
          Delete
        </button>
      </div>
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
