"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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

 const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
   console.log("Enter key pressed");
   const inputValue = e.currentTarget.value.trim();
   if (!inputValue) return;

   const newItem: ToDoItem = { id: toDoList.length + 1, text: inputValue };

   setToDoList((prev) => [...prev, newItem]);
   e.currentTarget.value = "";
  }
 };

 return (
  <div className='bg-blue-500 flex flex-col items-center  gap-2 container max-w-auto'>
   {/* input for taking list items */}
   <div className='bg-background text-foreground rounded-3xl relative w-1/3 has-focus-within:w-1/2 transition-width duration-300'>
    <Input
     className='rounded-3xl placeholder:text-sm placeholder:opacity-100 placeholder:text-foreground focus:placeholder:opacity-70 transition-all duration-300'
     placeholder='Add A Task Here...'
     //onChange={handleInputChange}
     onKeyDown={handleEnterKey}
     //     value={inputValue}
    />
    <FaMinusCircle className='absolute top-1/2 right-8 transform -translate-y-1/2' />
    <FaPlusCircle className='absolute top-1/2 right-2 transform -translate-y-1/2' />
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
       <input
        key={`${item.text}-checkbox`}
        onChange={() => handleCheckboxChange(item.id, item.text)}
        type='checkbox'
        className='w-4 h-4'
        checked={itemCheckedStates[item.id] || false}
       />
      </li>
     ))}
    </ul>
   </div>
  </div>
 );
}
