import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <Navbar />
      <div className=" mx-3 md:w-auto md:container mx-[60px] md:w-11/12 my-5 rounded-xl bg-violet-300 p-5 min-h-[80vh]">
      <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5">
          <h2 className='text-2xl font-bold '>Add a Todo</h2>
          <div className="flex">
            
            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-xl py-2 px-5' />
          <button onClick={handleAdd} disabled= {todo.length<=3} className='bg-violet-700 text-sm font-bold hover:bg-violet-950 disabled:bg-violet-700 p-2 py-1 text-white rounded-md mx-6'>Save</button>
          </div>
          
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished}/>Show Finished
        <h2 className='text-2xl font-bold'>Your Todos</h2>
        <div className="todos font-semibold">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {


            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handlecheckbox} type="checkbox" checked={todo.isCompleted} id='' />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-700 text-sm font-bold hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-700 text-sm font-bold hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
