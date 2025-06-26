import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      settodos(todos)
    }

  }, [])


  const handleChange = (e) => {
    settodo(e.target.value)
  }
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    savetodo();
  }
  const savetodo = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleDelete = (id) => {
    let newtodos = todos.filter((item) => {
      return item.id !== id
    }
    );
    settodos(newtodos);
    savetodo();
  }
  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newtodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    settodos(newtodos);
  };
  const handleEdit = (id) => {
    let a = todos.filter(i => i.id === id);
    settodo(a[0].todo);
    let newtodos = todos.filter((item) => {
      return item.id !== id
    }
    );
    settodos(newtodos);
    savetodo();
  }



  return (
    <>
      <Navbar />
      <div className="page">
        <div className="container">
          <div className="add">
            <h2>Add a todo</h2>
            <input className='in' onChange={handleChange} value={todo} type="text" placeholder='Type a task to do' />
            <button onClick={handleAdd} className='add-btn'>save</button>
          </div>
          <h2>Your To-dos</h2>
          {todos.length === 0 && <div className='notodo' >no todos to display gang !!</div>}
          {
            todos.map(item => {
              return <div key={item.id} className="todos">
                <div className="todo">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                  />
                  <div className={`task ${item.isCompleted ? "completed" : ""}`}>{item.todo}</div>
                  <div className="action">
                    <button onClick={() => handleEdit(item.id)} className='btn'><MdEditSquare /></button>
                    <button onClick={() => handleDelete(item.id)} className='btn'><MdDelete /></button>

                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
