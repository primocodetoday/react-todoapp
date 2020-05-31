import React, { useState } from 'react';
import PropTypes from 'prop-types';

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

  const handleAdd = () => {
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
    <form className="box">
      <div className="columns is-vcentered">
        <div className="field column is-two-fifths">
          <label className="label" htmlFor="addTask">
            Task name:
          </label>
          <div className="control">
            <input
              className="input"
              id="addTask"
              type="text"
              placeholder="30 push ups"
              value={formState.text}
              onChange={handleChangeText}
            />
          </div>
        </div>
        <div className="field column is-two-fifths">
          <label className="label" htmlFor="date">
            Until:
          </label>
          <div className="control">
            <input
              className="input"
              type="date"
              value={formState.date}
              min={minDate}
              max={maxDate}
              onChange={handleChangeDate}
            />
          </div>
        </div>
        <div className="field column">
          <div className="control has-text-centered">
            <label className="checkbox" htmlFor="important">
              Important
            </label>
            <input
              type="checkbox"
              value={formState.checked}
              id="important"
              onChange={handleChangeCheckbox}
            />
          </div>
        </div>
        <div className="field column has-text-centered">
          <button
            type="button"
            className="button is-primary is-outlined"
            onClick={handleAdd}
          >
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

AddTask.propTypes = {
  addSingleTask: PropTypes.func.isRequired,
};

export default AddTask;
