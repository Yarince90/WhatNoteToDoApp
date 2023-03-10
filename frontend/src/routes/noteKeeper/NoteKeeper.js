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
  const [userNotes, loadUserNotes] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const { sendRequest } = useHttpClient();
  const [note, setNote] = useState({
    title: "",
    content: ""
});
let isFocused = false;
  
//Handle Create Note Area text change  =-----------------------------------------
function handleChange(e){
    const{ name, value } = e.target;
    setNote(prevNote => {
        return {
            ...prevNote,
            [name]: value
        };
    });
}

//Load user notes from DB =---------------------------------------------------------
useEffect(() => {
const fetchNotes = async () => {
  try{
    const resData = await sendRequest(
      `http://localhost:5000/api/noteKeeper/user/${auth.userId}`
      )
      loadUserNotes(resData.userNotes);
  } catch (err) {console.log(err)}
};
fetchNotes();
}, [sendRequest, auth.userId]);

//Add note to DB  =-----------------------------------------------------------------
async function submitNote(event) {
    try{
      let noteData = JSON.stringify({
        title: note.title,
        content: note.content,
        creator: auth.userId
      });
      
      await sendRequest('http://localhost:5000/api/noteKeeper/addNote',
        'POST', noteData,
        {'Content-Type': 'application/json'}
      );
  
      loadUserNotes(prevNotes => {
        return [...prevNotes, note];
      });
    } catch (err) {console.log(err);}
  setNote({
    title: "",
    content: ""
  });
  event.preventDefault();
}

// Delete Note from DB =---------------------------------------------------------
  async function deleteNote(id) {  
    try {
      const resData = await sendRequest(
        `http://localhost:5000/api/noteKeeper/user/${id}`,
      'DELETE', null,
      {'Content-Type': 'application/json'}
    );
    loadUserNotes(resData.notes);
    } catch (err) {console.log(err);}
  }

  // Handle Focus for Create Note area (expand and retract rows) =------------------
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
      {userNotes.map((noteItem) => {
        return(
          <Note
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          />
        );
      })}
    
    </Fragment>
  )
}

export default NoteKeeper;