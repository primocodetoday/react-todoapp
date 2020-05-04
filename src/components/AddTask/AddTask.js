import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const AddTask = ({ addSingleTask }) => {
  const minDate = new Date().toISOString().slice(0, 10);
  let maxDate = minDate.slice(0, 4) * 1 + 1;
  maxDate += '-12-31';

  const [formState, setFormState] = useState({
    text: '',
    checked: false,
    date: minDate,
  });

  const handleChangeText = (e) => {
    setFormState({
      ...formState,
      text: e.target.value,
    });
  };

  const handleChangeCheckbox = (e) => {
    setFormState({
      ...formState,
      checked: e.target.checked,
    });
  };

  const handleChangeDate = (e) => {
    setFormState({
      ...formState,
      date: e.target.value,
    });
  };

  const handleClick = () => {
    const { text, date, checked } = formState;
    if (text.length > 2) {
      const add = addSingleTask(text, date, checked);
      // tu następuje odpalenie funkcji z argumentami w ToDoApp
      if (add) {
        setFormState({
          text: '',
          checked: false,
          date: minDate,
        });
      }
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="addTask">
          name:{' '}
          <input
            id="addTask"
            type="text"
            placeholder="Add task"
            value={formState.text}
            onChange={handleChangeText}
          />
        </label>
        <input
          type="checkbox"
          value={formState.checked}
          id="important"
          onChange={handleChangeCheckbox}
        />
        <label htmlFor="important">Important</label>
      </div>
      <div>
        <label htmlFor="date">until:</label>
        <input
          type="date"
          value={formState.date}
          min={minDate}
          max={maxDate}
          onChange={handleChangeDate}
        />
        <Button variant="contained" color="primary" onClick={handleClick}>
          Add
        </Button>
      </div>
    </div>
  );
};

AddTask.propTypes = {
  addSingleTask: PropTypes.func.isRequired,
};

export default AddTask;
