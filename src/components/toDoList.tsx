"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

interface ToDoItem {
 id: number;
 text: string;
}

export default function ToDoList() {
 const [itemCheckedStates, setItemCheckedStates] = useState<{
  [id: number]: boolean;
 }>({});
 const [toDoList, setToDoList] = useState<ToDoItem[]>([]);
 const [triggerDeletion, setTriggerDeletion] = useState(false);
 const inputRef = useRef<HTMLInputElement>(null);

 const handleMinusClick = () => {
  console.log("Minus icon clicked");
  setTriggerDeletion((prev) => !prev);
 };

 const handleDeleteTask = () => {
  console.log("Delete Task button clicked");
  setToDoList((prev) => prev.filter((item) => !itemCheckedStates[item.id]));
  setItemCheckedStates({});
 };

 const handleCheckboxChange = (id: number, item: string) => {
  const newCheckedStates = { ...itemCheckedStates };

  newCheckedStates[id] = !newCheckedStates[id];
  setItemCheckedStates(newCheckedStates);
  console.log(
   `Checkbox for "${item}" (ID: ${id}) changed to ${newCheckedStates[id]}`
  );
 };

 // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 //  const inputValue = e.target.value;
 //  console.log(inputValue);
 //  const newItem: ToDoItem = { id: SampleList.length + 1, text: inputValue };
 //  SampleList.push(newItem);
 // };

 const addTask = (value: string) => {
  if (!value.trim()) return;
  const newItem: ToDoItem = { id: toDoList.length + 1, text: value.trim() };
  setToDoList((prev) => [...prev, newItem]);
 };

 const handleAddTask = () => {
  if (inputRef.current) {
   addTask(inputRef.current.value);
   inputRef.current.value = ""; // Clear the input field after adding the task
  }
  console.log("Add Button Clicked");
 };

 const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
   addTask(e.currentTarget.value);
   console.log("Enter key pressed");
   e.currentTarget.value = "";
  }
 };

 const handleFocus = () => {
  setTriggerDeletion(false);
 };

 return (
  <div className='bg-blue-500 flex flex-col items-center gap-2 container max-w-auto min-h-screen'>
   {/* input for taking list items */}
   <div className='bg-background text-foreground rounded-3xl flex flex-row justify-center gap-1 w-3/4'>
    <div className=' relative w-2/4 has-focus-within:w-full transition-width duration-600'>
     <Input
      ref={inputRef}
      className='rounded-3xl placeholder:text-sm placeholder:opacity-100 placeholder:text-foreground focus:placeholder:opacity-70 transition-all duration-300'
      placeholder='Add A Task Here...'
      //onChange={handleInputChange}
      onKeyDown={handleEnterKey}
      onFocus={handleFocus}
      //     value={inputValue}
     />
     <FaMinusCircle
      onClick={handleMinusClick}
      className='absolute top-1/2 right-2 transform -translate-y-1/2'
     />
    </div>
    {triggerDeletion ? (
     <Button variant={"destructive"} onClick={handleDeleteTask}>
      <FaPlusCircle className='pt-0.5' />
      <span>Delete Task</span>
     </Button>
    ) : (
     <Button variant={"destructive"} onClick={handleAddTask}>
      <FaPlusCircle className='pt-0.5' />
      <span>Add Task</span>
     </Button>
    )}
   </div>
   {/* parent div of the ul to show list items */}
   <div className='w-5/12'>
    <ul className='bg-red-300 w-full'>
     {toDoList.map((item) => (
      <li
       key={item.id}
       className='odd:bg-green-600 even:bg-green-400 flex flex-row justify-between items-center gap-5 py-2 px-5  rounded-2xl'
      >
       <span>{item.text}</span>
       <AnimatePresence>
        {triggerDeletion && (
         <motion.div
          key={`checkbox-${item.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
         >
          <input
           onChange={() => handleCheckboxChange(item.id, item.text)}
           type='checkbox'
           className='w-4 h-4 accent-red-600'
           checked={itemCheckedStates[item.id] || false}
          />
         </motion.div>
        )}
       </AnimatePresence>
      </li>
     ))}
    </ul>
   </div>
  </div>
 );
}
