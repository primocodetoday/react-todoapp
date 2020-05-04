import React from 'react';
import PropTypes from 'prop-types';
import { Button, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const Task = ({ item, changeActive, deleteTask }) => {
  const { id, text, date, important, active, finishDate } = item;

  const finish = new Date(finishDate).toLocaleDateString();

  return (
    <ListItem>
      <ListItemText
        style={
          important
            ? {
                color: '#7700ff',
                fontWeight: '700',
              }
            : null
        }
      >
        {important ? `${text} !!!` : text}
      </ListItemText>
      <p>{finish !== '1.01.1970' ? finish : date}</p>
      {active && (
        <Button
          color="primary"
          variant="contained"
          onClick={() => changeActive(id)}
        >
          Done
        </Button>
      )}
      <IconButton color="secondary" onClick={() => deleteTask(id)}>
        <Delete />
      </IconButton>
    </ListItem>
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
