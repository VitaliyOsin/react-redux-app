import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { changeTitle, deleteTask, completeTask, getTasks, getTasksLoadingStatus, loadTasks, addTask } from './store/task';
import configureStore from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { getErrors } from './store/errors';

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getErrors());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, [dispatch]);

  if(isLoading){
    return <h1>Loading ...</h1>
  }

  if(error) {
    return <p>{error}</p>;
  }
 
  return (<>
  <h1>App</h1>
  <button onClick={() => { dispatch(addTask()) }}>Add Todo</button>
  <ul>
    {state.map(el => (
    <li key={el.id}>
      <p>{el.title}</p>
      <p>{`Completed: ${el.completed}`}</p>
      <button onClick={() => { dispatch(completeTask(el.id)) }}>Completed</button>
      <button onClick={() => { dispatch(changeTitle(el.id)) }}>Change Title</button>
      <button onClick={() => { dispatch(deleteTask(el.id)) }} style={{color: "#fff", backgroundColor: "#ff0000"}}>Delete</button>
      <hr />
    </li>
    ))}
  </ul>
  </>)
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
