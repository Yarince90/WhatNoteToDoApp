import React, { useState } from "react";

function CreateNote(props) {
    const [isExpanded, setExpanded] = useState(false);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    function handleChange(e){
        const{ name, value } = e.target;

        setNote(prevNote => {
            return {
                ...prevNote,
                [name]: value
            };
        });
    }

    function expand(){
        setExpanded(true);
    }

    return(
        <div>
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
                onClick={expand}
                onChange={handleChange}
                value={note.content}
                placeholder="Add note ..."
                rows={isExpanded ? 3 : 1}
                />
            </form>

        </div>
    )
}

export default CreateNote;