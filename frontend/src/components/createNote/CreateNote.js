import React, { useState } from "react";
import './createNote.css';

function CreateNote(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
          title: "",
          content: ""
      });

      function expand(){
          setExpanded(true);
      }
      
      function contract(){
        setExpanded(false);
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

    return(
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
            onFocus={expand}
            onBlur={contract}
            onChange={handleChange}
            value={note.content}
            placeholder="Add note ..."
            rows={isExpanded ? 3 : 1}
            />
        </form>
    )
    
}

export default CreateNote;