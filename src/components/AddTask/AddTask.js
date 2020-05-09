import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AddTask.module.scss';

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
    <div className={styles.form}>
      <label className={styles.item1} htmlFor="addTask">
        name:
      </label>
      <input
        className={styles.item2}
        id="addTask"
        type="text"
        placeholder="Add task"
        value={formState.text}
        onChange={handleChangeText}
      />
      <input
        className={styles.item3}
        type="checkbox"
        value={formState.checked}
        id="important"
        onChange={handleChangeCheckbox}
      />
      <label className={styles.item4} htmlFor="important">
        Important
      </label>
      <label className={styles.item5} htmlFor="date">
        until:
      </label>
      <input
        className={styles.item6}
        type="date"
        value={formState.date}
        min={minDate}
        max={maxDate}
        onChange={handleChangeDate}
      />
      <button type="button" className={styles.item7} onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

AddTask.propTypes = {
  addSingleTask: PropTypes.func.isRequired,
};

export default AddTask;
