import React from "react";
import { Routes, Route } from 'react-router-dom'; 
import './App.css';
import Header from "./components/header/Header";
import Home from './routes/home/Home';
import NoteKeeper from "./routes/noteKeeper/NoteKeeper";
import ToDoList from "./routes/toDoList/ToDoList";
import LogIn from "./routes/login/LogIn";
import Register from "./routes/register/Register";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home/>}/>
          <Route path="noteKeeper" element={<NoteKeeper/>}/>
          <Route path="toDoList" element={<ToDoList/>}/>
          <Route path="logIn" element={<LogIn/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </div>
  );
}
export default App;