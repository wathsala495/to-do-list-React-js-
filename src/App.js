import { useEffect, useState } from "react";
import './App.css'
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";


function App() {


const [alltodos,setAlltodos]=useState([])
const [newTitle,setNewTitle]=useState("")
const [newDescription,setNewDescription]=useState("")
const [isCompleteScreen,setIsCompleteScreen]=useState(false)
const [completedTodos,setCompletedTodos]=useState([])

const handleAlltodos=()=>{
  const newtodo={
    title:newTitle,
    description:newDescription,
  }
  let newtodosArr=[...alltodos]
  newtodosArr.push(newtodo)
  setAlltodos(newtodosArr)
  localStorage.setItem('todolist',JSON.stringify(newtodosArr))
}

useEffect(()=>{

  let saveddata =JSON.parse(localStorage.getItem('todolist'))
  let savedcompletedtodo =JSON.parse(localStorage.getItem('completedtodos'))
  if(saveddata){
  setAlltodos(saveddata)
  }
  if(savedcompletedtodo){
    setCompletedTodos(savedcompletedtodo) 
  }

},[])



// const handleDeleteTodo=(index)=>{
//   let reducesTodo =[...alltodos]
//   reducesTodo.splice(index)

//   localStorage.setItem('todolist',JSON.stringify(reducesTodo))
//   setAlltodos(reducesTodo)
// }
function handleDeleteTodo(index){
  let reducesTodo =[...alltodos]
  reducesTodo.splice(index)

  localStorage.setItem('todolist',JSON.stringify(reducesTodo))
  setAlltodos(reducesTodo)
}

const handleComplete=(index)=>{
  let now = new Date();
  let dd=now.getDate();
  let mm = now.getMonth()+1;
  let yyyy=now.getFullYear();
  let h=now.getHours();
  let m=now.getMinutes();
  let s=now.getSeconds();
  let completeOn=dd+ '-' + mm + '-'+yyyy + 'at'+ h+':'+m+':'+s;

  let filteredItem={
    ...alltodos[index],
    completeOn:completeOn
  }
  let updatedCompleteArr=[...completedTodos];
  updatedCompleteArr.push(filteredItem)
  setCompletedTodos(updatedCompleteArr)
  handleDeleteTodo(index)
  localStorage.setItem('completedtodos',JSON.stringify(updatedCompleteArr))
}

const handleDeleteCompletedTodo=(index)=>{
  let reducesTodo =[...completedTodos]
  reducesTodo.splice(index)

  localStorage.setItem('completedtodos',JSON.stringify(reducesTodo))
  setAlltodos(reducesTodo)
}

  return (
    
    <div  className="bg-[#1f1e1e] min-h-screen text-white flex  justify-center items-center">
      <div>
       <h1 className="text-center"> My Todos</h1>
         <div className="todo-wrapper bg-[#353434] p-[8%]  mt-[8%] overflow-y-auto shadow-2xl shadow-black">
          <div className="todo-input flex items-center  border-b-[1px] justify-center border-[grey] pb-[25px] mb-[25px]" >
          <div className="todo-input-item px-[20px]">
            <label className="font-bold  " >Title:</label>
            <input type="text" placeholder="what is the tassk title" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} className="ml-[5px] p-[8px] mt-[10px] w-[200px] focus:border[2px] focus:border-[green] text-[black]"/>
          </div>
          <div className="todo-input-item  ">
            <label className="font-bold">Description:</label>
            <input type="text" placeholder="what is the tassk title"  value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} className="ml-[5px] p-[5px] mt-[10px] w-[200px] text-[black]"/>
          </div>
          <div className="todo-input-item ">
            <button type="button" className="primaryBtn  bg-[rgb(0,230,122)] text-[white] mt-[25px] p-[10px] w-[60px] cursor-pointer hover:bg-[rgb(4,196,106)]" onClick={handleAlltodos}>Add</button>
          </div>
          </div>
          <div className="btn-area">
          {/* <button className={`secondaryBtn ${isCompleteScreen? 'active' :''}`} onClick={() => setIsCompleteScreen(false)}>ToDo</button>
<button className={`secondaryBtn bg-[rgb(71,71,71)] text-[white] mt-[25px] p-[8px] w-[120px] cursor-pointer hover:bg-[rgb(4,196,106)] ${isCompleteScreen === true ? 'active' : ''}`} onClick={() => setIsCompleteScreen(true)}>Completed</button> */}

          <button className={` bg-[rgb(71,71,71)] text-[white] mt-[25px] p-[8px] w-[60px] cursor-pointer hover:bg-rgb(4,196,106)] ${isCompleteScreen === false ? 'bg-[rgb(4,196,106)] ' : ''}`}  onClick={()=>setIsCompleteScreen(false)}>ToDo</button>
          <button className={`bg-[rgb(71,71,71)] text-[white] mt-[25px] p-[8px] w-[120px] cursor-pointer hover:bg-[rgb(4,196,106)] ${isCompleteScreen === true ? 'bg-[rgb(4,196,106)]' : ''} `}   onClick={()=>setIsCompleteScreen(true)}>Completed</button>
         </div>
        
        {
          isCompleteScreen===false && alltodos.map((item,index)=>(
            <div className="todo-list flex justify-between shadow-2xl mt-[10px] py-[10px] px-[10px] bg-[#414040] " key={index}>
            <div className="todo-list-item bg-[#414040] ">
                <h3 className="text-[25px] text-[rgb(0,230,122)] font-bold">{item.title}</h3>
                <p className="text-[14px] text-[rgb(161,161,161)] "> {item.description}</p>
              </div>
              <div className="flex items-center">
              <MdDelete className="text-[35px] cursor-pointer hover:text-[red]" onClick={()=>handleDeleteTodo(index)}/>
              <FaCheck  className="text-[25px] ml-[10px] text-[rgb(0,230,122)]" onClick={()=>handleComplete(index)}/>
              </div> 
          </div>
          )
           
          )
        }
              {/* <div className="todo-list-item bg-[#414040] ">
                <h3 className="text-[25px] text-[rgb(0,230,122)] font-bold">task 1</h3>
                <p className="text-[14px] text-[rgb(161,161,161)] "> Description</p>
              </div>
              <div className="flex items-center">
              <MdDelete className="text-[35px] cursor-pointer hover:text-[red]"/>
              <FaCheck  className="text-[25px] ml-[10px] text-[rgb(0,230,122)]"/>
              </div> */}
        
        {
          isCompleteScreen===true && completedTodos.map((item,index)=>(
            <div className="todo-list flex justify-between shadow-2xl mt-[10px] py-[10px] px-[10px] bg-[#414040] " key={index}>
            <div className="todo-list-item bg-[#414040] ">
                <h3 className="text-[25px] text-[rgb(0,230,122)] font-bold">{item.title}</h3>
                <p className="text-[14px] text-[rgb(161,161,161)] "> {item.description}</p>
                <p className="text-[14px] text-[rgb(161,161,161)] "><small>Completed on: {item.completeOn}</small></p>
              </div>
              <div className="flex items-center">
              <MdDelete className="text-[35px] cursor-pointer hover:text-[red]" onClick={()=>handleDeleteCompletedTodo(index)}/>
             
              </div> 
          </div>
          )
           
          )
        }
         
         </div>
         </div>   
    </div>
   
  );
}

export default App;
