'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function Page() {
  const [inputId, setInputId] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [detailsVisible, setDetailsVisible] = useState<number | null>(null);

  useEffect(() => {
    axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputId(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputId.trim() && inputTitle.trim()) {
      const newTodo: Todo = {
        id: parseInt(inputId),
        title: inputTitle,
        completed: true
      };
      setTodos(prevTodos => [...prevTodos, newTodo]);
      setInputId('');
      setInputTitle('');
    }
  };

  const handleCompletedChange = (id: number) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleTodoClick = (id: number) => {
    setDetailsVisible(prevId => (prevId === id ? null : id));
  };

  return (
    <div className="relative">
      <h1 className='text-orange-400 text-3xl absolute -top-24 right-0 w-full'>
        Todo App
      </h1>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Todo List</h1>
        <div className=" text-black">
          <label className="block mb-2">ID:</label>
          <input type="text" value={inputId} onChange={handleIdChange} className="border rounded p-2" />
        </div>
        <div className="mb-4 text-black">
          <label className="block mb-2">Title:</label>
          <input type="text" value={inputTitle} onChange={handleTitleChange} className="border rounded p-2" />
        </div>
        <button onClick={handleAddTodo} className="bg-blue-500 text-white px-4 py-2 rounded">Add Todo</button>
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">All the ToDos</h2>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <div onClick={() => handleTodoClick(todo.id)} className="cursor-pointer">
                  <input type="checkbox" checked={todo.completed} onChange={() => handleCompletedChange(todo.id)} />
                  <span className='text-blue-200'>Todo {todo.id}</span>
                </div>
                {detailsVisible === todo.id && (
                  <div className="ml-4">
                    <p>ID: {todo.id}</p>
                    <p>Title: {todo.title}</p>
                    <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Page;
