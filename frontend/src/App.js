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

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  //------------------------------Remove focus -------------------------------------
  document.body.addEventListener('click', function(e){

    //function removeFocus(){  
      if (e.target.classList.contains('createNote')){
        //contract(); ---Pass to CreateNote to contract
        console.log("createNote Area Clicked!!!");
      }

      else {
        console.log('Not Clicked');
      }

      console.log()
      

    //}
    
  })

  

  return (
    <div className="App">
      <Header />
      <CreateNote
        onAdd={addNote}
      />
      {notes.map((noteItem, index) => {
        return(
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default App;
