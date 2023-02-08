import React, { useState } from "react";
import './App.css';
import Header from './components/header/Header';
import Note from "./components/note/Note";
import CreateNote from "./components/createNote/CreateNote";

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

  function testClick () {
    var windowBody = window
    var popover = document.getElementsByClassName('createNote')
    windowBody?.addEventListener('click', function(event){ 
        if(popover === event.target) {
          console.log("clicked on the div")
        }
        if(popover !== event.target) {
          console.log("clicked outside the div")
        }
    })}



  return (
    <div className="App">
      <Header />
      <CreateNote 
        onAdd={addNote}
        clickTester={testClick}
      />
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
