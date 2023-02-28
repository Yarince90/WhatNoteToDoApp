import React from "react";
import { Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';
import './App.css';
import Header from "./components/header/Header";
import Home from './routes/home/Home';
import NoteKeeper from "./routes/noteKeeper/NoteKeeper";
import ToDoList from "./routes/toDoList/ToDoList";
import LogIn from "./routes/login/LogIn";
import Register from "./routes/register/Register";
import PrivateRoutes from "./utils/PrivateRoutes";


function App() {
  const { token, login, logout, userId } = useAuth();

  return (
    <div className="App">
      <AuthContext.Provider 
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home/>}/>
          <Route element={<PrivateRoutes />}>
            <Route path="noteKeeper" element={<NoteKeeper/>}/>
            <Route path="toDoList" element={<ToDoList/>}/>
          </Route>
          <Route path="logIn" element={<LogIn/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
      </AuthContext.Provider>
    </div>
  );
}
export default App;