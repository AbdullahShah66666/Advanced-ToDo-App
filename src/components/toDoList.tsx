"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { FaEdit, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

interface ToDoItem {
  id: string;
  text: string;
}

export default function ToDoList() {
  const [itemCheckedStates, setItemCheckedStates] = useState<{
    [id: string]: boolean;
  }>({});
  const [toDoList, setToDoList] = useState<ToDoItem[]>([]);
  const [triggerDeletion, setTriggerDeletion] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [editInputValue, setEditInputValue] = useState<string>("");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const divForInput = useRef<HTMLInputElement>(null);
  const divForTasks = useRef<HTMLInputElement>(null);
  const divForDeleteLine = useRef<HTMLInputElement>(null);
  const allSelected =
    toDoList.length > 0 && toDoList.every((item) => itemCheckedStates[item.id]);

  useEffect(() => {
    if (editInput) {
      console.log("input is here");
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (!editInputRef.current?.contains(e.target as Node)) {
        setEditInput(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [editInput]);

  useEffect(() => {
    if (triggerDeletion) {
      console.log("Deletion Enabled");
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        !divForInput.current?.contains(e.target as Node) &&
        !divForTasks.current?.contains(e.target as Node) &&
        !divForDeleteLine.current?.contains(e.target as Node)
      ) {
        setTriggerDeletion(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [triggerDeletion]);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  const inputValue = e.target.value;
  //  console.log(inputValue);
  //  const newItem: ToDoItem = { id: SampleList.length + 1, text: inputValue };
  //  SampleList.push(newItem);
  // };

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
      e.currentTarget.value = "";
      console.log("Enter key pressed");
    }
  };

  const addTask = (value: string) => {
    if (!value.trim()) return;
    const newItem: ToDoItem = { id: nanoid(), text: value.trim() };
    setToDoList((prev) => [...prev, newItem]);
  };

  const handleEditTask = (item: ToDoItem) => {
    const text = item.text;
    setEditInput(true);
    setEditInputValue(text);
    setEditingItemId(item.id);
    console.log("Edit Clicked:", text);
  };

  const handleEditEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && editingItemId) {
      setEditInput(false);
      setToDoList((prev) =>
        prev.map((todoItem) =>
          todoItem.id === editingItemId
            ? { ...todoItem, text: editInputValue }
            : todoItem
        )
      );
      setEditingItemId(null); // Clean up
      setEditInputValue(""); // Clean Up
      console.log("Enter in edit input pressed");
    }
  };

  const handleMinusClick = () => {
    console.log("Minus icon clicked");
    setTriggerDeletion((prev) => !prev);
    if (inputRef.current) {
      inputRef.current.blur(); // Focus the input field when the minus icon is clicked
    }
  };

  const handleSelectAll = () => {
    const allIds = toDoList.map((item) => item.id);
    const allSelected =
      toDoList.length > 0 && allIds.every((id) => itemCheckedStates[id]);

    const newStates: { [id: number]: boolean } = {};
    for (const id of allIds) {
      newStates[id] = !allSelected; // toggle logic
    }

    setItemCheckedStates(newStates);
  };

  const handleCheckboxChange = (id: string, item: string) => {
    const newCheckedStates = { ...itemCheckedStates };

    newCheckedStates[id] = !newCheckedStates[id];
    setItemCheckedStates(newCheckedStates);
    console.log(
      `Checkbox for "${item}" (ID: ${id}) changed to ${newCheckedStates[id]}`
    );
  };

  const handleDeleteTask = () => {
    console.log("Delete Task button clicked");
    setToDoList((prev) => prev.filter((item) => !itemCheckedStates[item.id]));
    setItemCheckedStates({});
  };

  const handleFocus = () => {
    setTriggerDeletion(false);
  };

  return (
    <div className='bg-black flex flex-col items-center gap-2 container max-w-auto min-h-screen'>
      {/* Input Overlay For Editing */}
      <AnimatePresence>
        {editInput && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 bg-black/80 z-50 flex items-center justify-center'
          >
            <input
              ref={editInputRef}
              value={editInputValue}
              onChange={(e) => setEditInputValue(e.target.value)}
              className='bg-blue-600 py-3 px-3 rounded-3xl text-lg font-semibold'
              onKeyDown={handleEditEnter}
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* input for taking list items */}
      <div
        ref={divForInput}
        className='bg-background text-foreground rounded-3xl flex flex-row justify-center gap-1 w-full md:w-3/4'
      >
        <div className='relative w-2/3 has-focus-within:w-full transition-width duration-600'>
          <Input
            ref={inputRef}
            className='rounded-3xl placeholder:text-sm placeholder:opacity-100 placeholder:text-foreground focus:placeholder:opacity-70 transition-all duration-300'
            placeholder='Add A Task Here...'
            //onChange={handleInputChange}
            onKeyDown={handleEnterKey}
            onFocus={handleFocus}
          />
          <FaMinusCircle
            onClick={handleMinusClick}
            size={32}
            className='absolute top-1/2 right-0.5 transform -translate-y-1/2 active:opacity-90'
          />
        </div>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, type: "tween" }}
          >
            {triggerDeletion ? (
              <Button
                className='bg-red-500 hover:bg-red-600'
                onClick={handleDeleteTask}
              >
                <FaMinusCircle className='pt-0.3' />
                <span className='text-md font-bold'>Delete Task(s)</span>
              </Button>
            ) : (
              <Button
                className='bg-green-500 hover:bg-green-600'
                onClick={handleAddTask}
              >
                <FaPlusCircle className='pt-0.3' />
                <span className='text-md font-bold'>Add Task</span>
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Delete Select All Line */}
      <AnimatePresence>
        {triggerDeletion && toDoList.length > 0 ? (
          <motion.div
            ref={divForDeleteLine}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className='flex flex-row items-center justify-between bg-gray-700 text-lg md:text-md font-semibold w-full md:w-1/2'
          >
            <span>Select the items to delete:</span>
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`${allSelected ? "bg-green-500" : "bg-red-500"} rounded-2xl px-2 py-1 flex flex-row items-center gap-2`}
            >
              <AnimatePresence mode='wait'>
                <motion.span
                  key={allSelected ? "DeSelect" : "Select"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className='text-lg md:text-md font-medium'
                  onClick={handleSelectAll}
                >
                  {allSelected ? "DeSelect All" : "Select All"}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {/* parent div of the ul to show list items */}
      <div ref={divForTasks} className='min-w-1/2'>
        <ul className='bg-gray-700 w-full'>
          <AnimatePresence>
            {toDoList.map((item) => (
              <motion.li
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.3 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className='odd:bg-gray-900 even:bg-gray-950 flex flex-row justify-between items-center py-2 px-5 rounded-2xl'
              >
                <span>{item.text}</span>
                <AnimatePresence mode='wait'>
                  {triggerDeletion ? (
                    <motion.div
                      key={`checkbox-${item.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <input
                        onChange={() =>
                          handleCheckboxChange(item.id, item.text)
                        }
                        type='checkbox'
                        className='w-4 h-4 accent-red-600'
                        checked={itemCheckedStates[item.id] || false}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`edit-${item.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaEdit size={20} onClick={() => handleEditTask(item)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}
