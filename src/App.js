import React, { useState, useEffect } from "react";
import './App.css';

//Importing components:

import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {

  //State 
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  
  //Run once when app starts
  useEffect(() => {
    getLocalTodos();
  }, []);

    //Effect
    useEffect(() => {
        //Funtions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todos => todos.completed === true));
        break;
      
      case 'uncompleted':
        setFilteredTodos(todos.filter(todos => todos.completed === false));
        break;
      
      default: 
        setFilteredTodos(todos);
        break;
      }
  };
      filterHandler();
     }, [todos, status]);
  
//Save to local storage

const saveLocalTodos = () => {  
    localStorage.setItem('todos', JSON.stringify(todos));
};
const getLocalTodos = () => {
  if (localStorage.getItem('todos') ===null){
    localStorage.setItem('todos', JSON.stringify([]));
  }else{
   let todoLocal = JSON.parse(localStorage.getItem('todos'));
   setTodos(todoLocal);
  }
};
  
  return (
    <div className="App">
      <header className="App">
        <h1>Sai's Todo list </h1>
      </header>
      <Form 
      inputText={inputText}
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText} 
      setStatus={setStatus}
      />
      <TodoList 
      filteredTodos={filteredTodos} 
      setTodos={setTodos} 
      todos={todos} 
      />
    </div>
  );
}

export default App;
