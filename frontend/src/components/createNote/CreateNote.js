import React, { useState } from "react";
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import './createNote.css';

function CreateNote(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
          title: "",
          content: ""
      });

    //useState functions to change row size on text area
    function expand(){
      setExpanded(true);
    }
    
    function contract(){
      setExpanded(false);
    }

    //Add Focus
    function addFocus(){
      let createNoteEl = document.getElementsByClassName('createNote');
      
      for(let i = 0; i < createNoteEl.length; i++){
        createNoteEl[i].focus();
      }
      expand();

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
        props.onAdd(note);
        setNote({
          title: "",
          content: ""
        });
        event.preventDefault();
      }

    return(
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
            onClick={addFocus}
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
    )
}

export default CreateNote;