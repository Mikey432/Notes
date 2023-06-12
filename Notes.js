import React, { useContext,useState} from "react";
import Notecontext from "../Context/NoteContext";
import Notesitem from "./Notesitem";
import Addnotes from "./Addnotes";
import { useEffect, useRef } from "react";

function Notes() {
  const context = useContext(Notecontext);
  const { notes, getnote , editnote } = context;
  useEffect(() => {
    getnote();
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [Notes,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  const updatenote = (Note) => {
    ref.current.click();
    console.log(Notes);
    console.log(Note);
    setNote({
      id:Note._id,
      etitle:Note.title,
      edescription:Note.description,
      etag:Note.tag
    })
  }
  const handlenote = ()=>{
    console.log("Updating Note...");
    editnote(Notes.id,Notes.etitle,Notes.edescription,Notes.etag);
    console.log(editnote(Notes.id,Notes.etitle,Notes.edescription,Notes.etag))
    refClose.current.click();
  }
  const onChange = (event)=>{
    setNote({...Notes,[event.target.name]:event.target.value})
  }
  
  return (
    <>
      <Addnotes />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <form>
            <div className="form-group my-3">
              <label htmlFor="title">Title</label>
              <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange} value={Notes.etitle}/>
            </div>
            <div className="form-group my-3">
              <label htmlFor="description">Description</label>
              <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Enter description" onChange={onChange} value={Notes.edescription}/>
            </div>
            <div className="form-group my-3">
              <label htmlFor="tag">Tag</label>
              <input type="text" className="form-control" id="etag" name="etag" placeholder="Enter tag" onChange={onChange} value={Notes.etag}/>
            </div>
          </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handlenote} type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((Notes) => {
          return (
            <Notesitem key={Notes._id} updatenote={updatenote} note={Notes} />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
