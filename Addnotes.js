import React, { useContext,useState } from "react";
import Notecontext from "../Context/NoteContext";

const Addnotes = () => {
  const context = useContext(Notecontext);
  const {addnote} = context;
  const [note,setNote] = useState({title:"",description:"",tag:"default"})
  const handleaddnote = (event)=>{
    event.preventDefault();
    addnote(note.title,note.description,note.tag);
  }
  const onChange = (event)=>{
    setNote({...note,[event.target.name]:event.target.value})
  }
  return (
    <div>
        <div className="container my-3">
        <h2>Write a Note</h2>
        <form>
          <div className="form-group my-3">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title" onChange={onChange}/>
          </div>
          <div className="form-group my-3">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" name="description" placeholder="Enter description" onChange={onChange}/>
          </div>
          <div className="form-group my-3">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter tag" onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary my-3" onClick={handleaddnote}>Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default Addnotes