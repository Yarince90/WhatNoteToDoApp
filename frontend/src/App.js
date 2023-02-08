import React, { useState } from "react";
import './App.css';
import Header from './components/header/Header';
import Note from "./components/note/Note";

function App() {
  const [notes, setNotes] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function expand(){
        setExpanded(true);
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
      <form className="createNote">
            {isExpanded && (
             <input 
               name="title"
               onChange={handleChange}
               value={note.title}
               placeholder="Title"
             />
            )}
             <textarea
              name="content"
              onMouseOver={expand}
              onChange={handleChange}
              value={note.content}
              placeholder="Add note ..."
              rows={isExpanded ? 3 : 1}
              />
      </form>
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
