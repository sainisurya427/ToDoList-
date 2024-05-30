import React, { useEffect, useState } from 'react'
import './ToDoList.css';
import { AiOutlineDelete} from 'react-icons/ai'
import { Target } from 'react-feather';

export default function ToDoList() {
   const handleDelete = (index)=>{
      let reduce = [...allToDo];
      reduce.splice(index);

      setToDo(reduce);

      localStorage.setItem('ToDoList', JSON.stringify(reduce));
   }
   
   const[isScreen, setIsScreen]= useState(false);
   const [allToDo, setToDo] = useState([]);
   const [newTitle, setNewTitle] = useState("");
   const [newDes, setNewDec] = useState("");

   const handleAddToDo = ()=>{
      let newToDoItem = {
         title:newTitle,
         description:newDes
      }  
   let update = [...allToDo];
   update.Push(newToDoItem);
   setToDo(update);
   localStorage.setItem('ToDoList', JSON.stringify(update));

   }
   useEffect(()=>{
      let save =JSON.parse( localStorage.getItem('ToDoList'));
      if(save){
         setToDo(save);
      }
   },[])
  return (
    <div className='ToDoList'>
      <div className="ToDo">
        <div className="input">
            <div className="input-item">
                <label htmlFor="text">Title</label>
                <input type="text" value={newTitle} onchange={(e)=>setNewTitle(e ,Target.value)} placeholder='Task Title'  name='text' id='text'/>
             </div>
             <div className="input-item">
                <label htmlFor="text">Description</label>
                <input type="text" value={newDes} onchange={(e)=>setNewDec(e ,Target.value)}  placeholder='Task Description'  name='text' id='text'/>
             </div>
             <div className="input-item">
                <button type='button' onClick={handleAddToDo} className='secondaryBtn' >Add</button>
             </div>
             <div className="btn">
                <button className={`primaryBtn ${isScreen===false && 'active'}`} onClick={()=>{setIsScreen(false)}} >ToDo</button>
                <button className= {` primaryBtn ${isScreen===true && 'active'}`} onClick={()=>{setIsScreen(true)}}>Completed</button>
             </div>
             <div className="list">
             {allToDo.map((item, index) =>{
               return(
                 
                <><div className="list-item" key={index}>

                     <div>
                        <h2>{item.title}</h2>
                        <p> {item.description}</p></div>
                  </div>
                  <div>
                        <AiOutlineDelete className='icon'  onClick={()=>handleDelete(index)} 
                        title='Delete'/>
                        <BsCheckLg className='check-icon' />
                     </div>
                     </>
               )}
               
              )};
               
        </div>
      </div>
    </div>
    </div>
  );
  }
