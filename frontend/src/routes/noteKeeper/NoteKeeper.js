import React, { useState, Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hooks/http-hook";
import Note from '../../components/note/Note';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import './noteKeeper.css';


function NoteKeeper() {
  const auth = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [userNotes, loadUserNotes] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const { sendRequest } = useHttpClient();
  const [note, setNote] = useState({
    title: "",
    content: ""
});
let isFocused = false;
  
//Handle Create Note Area text change  
function handleChange(e){
    const{ name, value } = e.target;
    setNote(prevNote => {
        return {
            ...prevNote,
            [name]: value
        };
    });
}

//Load notes from DB
useEffect(() => {
const fetchNotes = async () => {
  try{
    const resData = await sendRequest(
      'http://localhost:5000/api/noteKeeper'
      )
      loadUserNotes(resData.notes);
  } catch (err) {console.log(err)}
};
fetchNotes();
}, [sendRequest])


//Add to notes DB or local array if user is not logged in
async function addNote(newNote) {
  //Add to DB if user is logged in
  if(auth.isLoggedIn){
    try{
      await fetch('http://localhost:5000/api/noteKeeper/addNote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: note.title,
        content: note.content,
        creator: auth.userId
      })
      });
      
    } catch (err) {console.log(err);}

  } else {
    //Add to local memory notes array if no user is logged in
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }
}

//Add to note array and set Create Note Area to empty
function submitNote(event) {
  addNote(note);
  setNote({
    title: "",
    content: ""
  });
  event.preventDefault();
}

  //Delete single note
  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  // Handle Focus for Create Note area (expand and retract rows)
  document.body.addEventListener('click', function(e){
      if (e.target.classList.contains('createNote')){
        isFocused = true;
      }
      else {
        isFocused = false;
        setExpanded(false);
      }
  })
  function setChange() {
    isFocused = true;
  }
  function handleFocus(){
    if(isFocused){
      setExpanded(true);
    }
  }

  return(
    <Fragment>
      {/* Create Note Area */}
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
            onMouseOver={setChange}
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
      {/* Return notes array */}
      {auth.isLoggedIn ? 
      userNotes.map((noteItem) => {
        return(
          <Note
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          />
        );
      })
      :
      notes.map((noteItem, index) => {
        return(
          <Note
          key={index}
          id={index}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          />
        );
      })
    }
    </Fragment>
  )
}

export default NoteKeeper;