import { deleteTodo, toggleTodo } from "../store/todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({id, completed, title }) => {
  const dispatch = useDispatch();

    return (
      <li key={id}>
        <input type="checkbox" checked={completed} onChange={()=> dispatch(toggleTodo(id))}/>
        <span className={completed ? 'doneTodo' : ''}>{title}</span>
        <span className="delete" onClick={() => dispatch(deleteTodo(id))}>&times;</span>
      </li>
    )
  }
  export default TodoItem
