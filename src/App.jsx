import { useState,useRef,useEffect } from "react";
import Nav from "./component/Nav";
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [text, settext] = useState("");

  const [todos, settodos] = useState([])
  
  const [isComplet] = useState(false)
  
  const [visible,setvisible] = useState(true)

  const inpt = useRef()
  const icon = useRef()
  const togVisible = useRef()

  useEffect(() => {
    let todosString=localStorage.getItem('todos')
    if (todosString){
      let ptodos=JSON.parse(todosString)
      settodos(ptodos) 
    }
  },[])

  
  let saveToLocalStorage= ()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  }

  function handleChange(e){
    settext(e.target.value)
  }
  
  function saveChange(){
    if (text.length>0){
      settodos([...todos,{id:uuidv4(),text:text,isComplet:isComplet,visible:visible}])
      settext('')
    }
    saveToLocalStorage()
  }
  
  function handleEdit(id){
    let index= todos.findIndex(item=>{
      if (item.id===id){
        return item.id===id;
      }
    }) 
    let newTodos= [...todos]
    settext(todos[index].text)
    newTodos.splice(index, 1)
    settodos(newTodos)
    saveToLocalStorage()
  }
  

  function handleDelet(id) {
    const newTodos = todos.filter(todo => todo.id !== id);
    settodos(newTodos); // This creates a new array and updates the state
    saveToLocalStorage();   // Save the updated state to localStorage
  }
  
  function handleCheckbox(e){
    let id =e.target.name
    let indx= todos.findIndex((item)=>{
      return item.id===id
    })

    let newTodos= [...todos]
    newTodos[indx].isComplet=!newTodos[indx].isComplet
    newTodos[indx].visible=!newTodos[indx].visible
    settodos(newTodos)
    saveToLocalStorage()
  }

  function showCompleted(){
    let newTodos=[...todos]
    console.log('hbfhhdhjfd',newTodos)
    newTodos.forEach(el=>{
      el.visible=!el.visible
    })
    setvisible(!visible)
    settodos(newTodos)
  }

  

  return (
    <>
      <Nav />

      <div className="container min-h-[80vh]  bg-orange-300 mx-auto mt-12 rounded-lg flex flex-col justify-start items-center  ">
        <h1 className=" font-bold text-2xl p-1 text-white border-solid  border-[.1rem] m-6">
          Todo List
        </h1>

        <div className="mb-12 mt-5 ">
          <input onChange={handleChange} ref={inpt} value={text} type="text" placeholder="Add Your Todo" className="border-none focus:border-solid border-gray-500 border-[3px] text-green-600 font-bold h-10 w-[50vw] rounded-md  hover:bg-slate-200  text-sm pl-3 "/>
          <button onClick={saveChange} className="ml-4 h-10 w-14 bg-blue-500 rounded-md text-white font-bold hover:bg-blue-700">Save</button>
        {
          visible?<button onClick={showCompleted} ref={togVisible} className="bg-green-500 p-1 hover:bg-green-600 block m-6 ml-0">
          Show completed Tasks</button> : <button onClick={showCompleted} ref={togVisible} className="bg-red-500 p-1 hover:bg-red-600 block m-6 ml-0">
          hide completed tasks</button>
        }

        </div>

        <div className="todos ">
          <h2 className="font-bold p-2 text-yellow-950 border-solid border-yellow-800 border-[1px] w-28 mb-6 mx-auto">
            Your Todos
          </h2>

          {todos.map(todo=>{

          return <div key={todo.id}  className={`atodo flex items-center m-3 ${todo.visible?'flex':'hidden'}`}>
            <input type="checkbox" onChange={handleCheckbox} name={todo.id}  className="cursor-pointer   h-4 w-4 mr-1 "/>
            <div className="text min-h-8 w-[40vw] rounded-md bg-slate-300 p-2 text-yellow-900 font-semibold flex items-center justify-between"> {todo.text} <i ref={icon} className={`text-xl mx-2 ${todo.isComplet?'block':"hidden"}`} >✔</i>  </div>

            <div className="buttons ml-4 flex gap-2">
              <button onClick={() => handleEdit(todo.id)} className="h-8 w-14 bg-blue-500 rounded-[3px] text-white font-bold hover:bg-blue-700">
                Edit
              </button>
              <button  onClick={() => handleDelet(todo.id)} className="h-8 w-14 bg-blue-500 rounded-[3px] text-white font-bold hover:bg-blue-700">
                Delete
              </button>
            </div>
          </div>
          })}

        </div>

      </div>

    </>
  );
}

export default App;

