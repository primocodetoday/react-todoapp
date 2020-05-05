import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid, Container } from '@material-ui/core';
import { AddTask, TaskList } from '.';
import { Header, Footer } from '../layouts';
import todos from '../store/baseTaskList';

const ToDoApp = () => {
  const [state, setState] = useState(todos);

  const localStorageAdd = (key, result) => {
    localStorage.setItem(key, JSON.stringify(result));
  };

  const handleChangeActive = (id) => {
    const prevState = [...state];
    prevState.map((task) => {
      if (task.id === id) {
        task.active = false;
        task.finishDate = new Date().getTime();
      }
      return true;
    });
    setState(() => prevState);
    localStorageAdd('data', prevState);
  };

  const handleDeleteTask = (id) => {
    const prevState = [...state];
    const result = prevState.filter((task) => task.id !== id);
    // zwraca wszystkie elementy które mają różne Id od przekazanego
    setState(() => result);
    localStorageAdd('data', result);
  };

  const addSingleTask = (text, date, important) => {
    const newTask = {
      id: state.length + 2,
      text,
      date,
      important,
      active: true,
      finishDate: null,
    };
    setState((prevState) => {
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
      if (localStorageDrive !== JSON.stringify(state)) {
        setState(JSON.parse(localStorageDrive));
      }
    } else localStorageAdd('data', state);
  }, [state]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <Grid
          spacing={1}
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          style={{ marginTop: 15 }}
        >
          <AddTask addSingleTask={addSingleTask} />
          <TaskList
            taskList={state}
            deleteTask={handleDeleteTask}
            changeActive={handleChangeActive}
          />
        </Grid>

        <Footer />
      </Container>
    </>
  );
};

export default ToDoApp;
