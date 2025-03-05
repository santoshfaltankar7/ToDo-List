import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import Heading1 from "./headling";
function AddItem(){
  const[inputVlaue,setInputValue]=useState("")
  const[addItem,setAdditem]=useState([])

  function handleonchange(i){
    setInputValue(i.target.value)


  }

  function handleonclick(){

    setAdditem([inputVlaue,addItem])
    setInputValue("")
   

  }

  return(
    <div>
      <input type="text" placeholder="Enter your task" value={inputVlaue} onChange={handleonchange}/>
      <button type="button" onClick={handleonclick}><IoIosAddCircle /></button>
      {
        addItem.map((m)=>
          <h1 key={m.value}>{m}</h1>
        )
      }
    </div>
  )
}
export default AddItem