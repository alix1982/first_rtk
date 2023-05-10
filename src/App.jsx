import './App.css';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoFetch, fetchTodos } from './store/todoSlice';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const {status, error} = useSelector(state => state.todos)
  const addTask = () => {
    dispatch(addTodoFetch(text));
    setText('');
  }

  useEffect(()=>{
    dispatch(fetchTodos())
  }, [dispatch])

  return (
    <div className="App">
      <TodoForm text={text} setText={setText} addTodo={addTask} />
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>Error: {error}</h2>}
      <TodoList />
    </div>
  );
}

export default App;
