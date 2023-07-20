import { useState, useEffect } from 'react'

const API_BASE = 'https://mern-crud-app-a386.onrender.com';
function App() {
  const [todos,setTodos] = useState([]);
  const [popupActive, setpopupActive] = useState(false)
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    GetTodos();
    console.log(todos);
  },[])

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Error : ',err))
  }

  const completeTodo = async id => {
    const data = await fetch(API_BASE+'/todo/complete/'+id)
          .then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if(todo._id === data._id) todo.complete = data.complete
      return todo;
    }));
  }

  const deleteTodo = async id => {
    const data = await fetch(API_BASE+'/todo/delete/'+id, {method: 'DELETE'})
          .then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

  const addTodo = async () => {
    if(newTodo==="") {
      alert("Type something bro...");
      return;
    }
    const data = await fetch(API_BASE+'/todo/new',{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: newTodo
      })
    }).then(res => res.json());

    setTodos([...todos,data]);
    setpopupActive(false);
    setNewTodo('');

    console.log(data);
  }

  return (
    <div className="App">
      <h1>Welcome, Bro</h1>
      <h4>Your Tasks Here...</h4>

      <div className='todos'>
        {todos.map(todo => (
          <div className='box'>
            {/* <div className='todo'> */}
            <div className={'todo '+(todo.complete ? 'is-complete' : '')} key={todo._id} onClick={() => completeTodo(todo._id)}>
              <div className='checkbox'></div>
              <div className='text'>{todo.text}</div>
            </div>
            <div className='delete-todo' onClick={() => deleteTodo(todo._id)}><i class="fa-solid fa-x"></i></div>
          </div>
            
        ))}
      </div>

      <div className='addPopup' onClick={() => setpopupActive(true)}><i class="fa-solid fa-plus"></i></div>

      {popupActive ? (
        <div className='popup'>
          <div className='closePopup'  onClick={() => setpopupActive(false)}><i class="fa-solid fa-x"></i></div>
          <div className='content'>
            <h3>Add a Task</h3>
            <input type='text' className='add-todo-input' onChange={e => setNewTodo(e.target.value)} value={newTodo} />
          </div>
          <div className='button' onClick={addTodo}>Create Task</div>
        </div>
        
      ) : ''}
    </div>
  ); 
}




export default App;
