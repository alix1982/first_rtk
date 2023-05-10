const TodoForm = ({text, setText, addTodo}) => {
  return (
    <label>
      <input value={text} onChange={(e)=>{setText(e.target.value)}} />
      <button onClick={addTodo}> Add todo </button>
    </label>
  )
}

export default TodoForm