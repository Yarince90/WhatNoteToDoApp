import React, { useState } from "react";
import './App.css';
import Header from './components/header/Header';
import Note from "./components/note/Note";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

function App() {
  const [notes, setNotes] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: ""
});
let isFocused = false;

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

  function handleChange(e){
    const{ name, value } = e.target;

    setNote(prevNote => {
        return {
            ...prevNote,
            [name]: value
        };
    });
}

function submitNote(event) {
  addNote(note);
  setNote({
    title: "",
    content: ""
  });
  event.preventDefault();
}

  //------------------------------Handle focus -------------------------------------
  document.body.addEventListener('click', function(e){
      if (e.target.classList.contains('createNote')){
        isFocused = true;
        console.log("createNote Area Clicked!!!");
        setExpanded(true);
      }

      else if (!e.target.classList.contains('createNote')){
        isFocused = false;
        console.log('Not Clicked');
        setExpanded(false);
      }
  })

  function handleFocus(){
    if(isFocused){
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }

  

  return (
    <div className="App">
      <Header />
      <form className="createNote">
        {isExpanded && (
          <input className="createNote"
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
          )}
          <textarea className="createNote"
            name="content"
            onClick={handleFocus}
            onChange={handleChange}
            value={note.content}
            placeholder="Add note ..."
            rows={isExpanded ? 3 : 1}
            />
            <Zoom in={isExpanded}>
              <Fab onClick={submitNote}>
                <AddCircleRoundedIcon />
              </Fab>
            </Zoom>
        </form>
    
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
