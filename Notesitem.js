import React, { useContext } from "react";
import Notecontext from "../Context/NoteContext";

function Notesitem(props) {
  const context = useContext(Notecontext);
  const {deletenote} = context;
  const { note,updatenote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-center">
          <h5 className="card-title mx-3">{note.title}</h5>
          <i className="fa-regular fa-trash-can mx-2 my-1" onClick={()=>{deletenote(note._id)}}></i>
          <i className="fa-regular fa-pen-to-square mx-2 my-1" onClick={()=>{updatenote(note)}}></i>
          </div>
          <p className="card-text d-flex justify-content-center">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Notesitem;
