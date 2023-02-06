import React, { useState } from "react";
import './App.css';
import Header from './components/header/Header';
import CreateNote from './components/createNote/CreateNote';
import Note from "./components/note/Note";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  // function deleteNote(id) {
  //   setNotes(prevNotes => {
  //     return prevNotes.filter((noteItem, index) => {
  //       return index !== id;
  //     });
  //   });
  // }




  return (
    <div className="App">
      <Header />
      <CreateNote onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return(
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
          />
        );
      })}
    </div>
  );
}

export default App;
