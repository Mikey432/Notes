import React from 'react'
import Notecontext from './NoteContext'
import { useState } from 'react'
function NoteState(props) {
    const host = 'http://localhost:5000'
    const notesInitial = []
    const [notes,setNotes] = useState(notesInitial)

    //get note
    const getnote = async ()=>{
      //Api fetch
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NzZlOTM2YzY2OGIxN2U1YWM5OGU3In0sImlhdCI6MTY4NTcyMzkzOX0.NikQ6G6bdSRpuNiFMHv5RfhTLxdhd57CjENQSKSrDpM"
        },
      });
      const json = await response.json()
      console.log(json)
      setNotes(json)

    }
    //add note
    const addnote = async (title,description,tag)=>{
      //Api fetch
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NzZlOTM2YzY2OGIxN2U1YWM5OGU3In0sImlhdCI6MTY4NTcyMzkzOX0.NikQ6G6bdSRpuNiFMHv5RfhTLxdhd57CjENQSKSrDpM"
        },
        body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json();
      console.log(json)
      
      const note = {
        "_id": "647f68ebc6b912c0db1cc186f",
        "user": "64776e936c668b17e5ac98e7",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-06-06T17:12:11.777Z",
        "__v": 0
      };
      setNotes(notes.concat(note))

    }
    //delete note 
    const deletenote = async(id)=>{
       //Api fetch
       const response = await fetch(`${host}/api/notes/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NzZlOTM2YzY2OGIxN2U1YWM5OGU3In0sImlhdCI6MTY4NTcyMzkzOX0.NikQ6G6bdSRpuNiFMHv5RfhTLxdhd57CjENQSKSrDpM"
        }
      });
      const json = await response.json();
      console.log(json)
      console.log("Delete Notes " + id)
      const newNote = notes.filter((note)=>{return note._id!==id})
      setNotes(newNote)
    }
    //edit note
    const editnote = async ({id,title,description,tag})=>{
      //Api fetch
      const response = await fetch(`${host}/api/notes/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3NzZlOTM2YzY2OGIxN2U1YWM5OGU3In0sImlhdCI6MTY4NTcyMzkzOX0.NikQ6G6bdSRpuNiFMHv5RfhTLxdhd57CjENQSKSrDpM"
        },
        body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json();
      console.log(json)

      let newNote = JSON.parse(JSON.stringify(notes))
      
      for (let index = 0; index < newNote.length; index++) {
        const element = newNote[index];
        if(element._id===id){
          newNote[index].title = title
          newNote[index].description = description
          newNote[index].tag = tag
          break;
        }
      }
      console.log(newNote)
      setNotes(newNote)
    }

  return (
    <Notecontext.Provider value={{notes,addnote,deletenote,editnote,getnote}}>
        {props.children}
    </Notecontext.Provider>
  )
}

export default NoteState