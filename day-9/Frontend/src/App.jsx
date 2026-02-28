import { useEffect, useState } from 'react'
import axios from 'axios';



function App() {

  const [notes, setnotes] = useState([
  ])

  function handleSubmit(e) {
    e.preventDefault();
    
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);

    axios.post('https://backend-two-jet-85.vercel.app/api/notes', {
      title: title.value,
      description: description.value
    }).then(res => {
      console.log(res.data);
      fatchNotes();
    })

  }

  function fatchNotes() {
    axios.get('https://backend-two-jet-85.vercel.app/api/notes')
      .then(res => {
        console.log(res.data.notes);
        setnotes(res.data.notes);

      })
  }

  useEffect(() => {
    fatchNotes();
  }, [])


  const [editingNote, setEditingNote] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editDescription, setEditDescription] = useState("");

const handleEditClick = (note) => {
  setEditingNote(note._id);
  setEditTitle(note.title);
  setEditDescription(note.description);
};
const saveEdit = async (id) => {
  await axios.patch(`https://backend-two-jet-85.vercel.app/api/notes/${id}`, {
    title: editTitle,
    description: editDescription
  });

  setEditingNote(null);
  fatchNotes(); // reload notes
};

  // function handleEdit(id){
  //   const newTitle = prompt("Enter new title");
  //   const newDescription = prompt("Enter new description");
   
  //   axios.patch('http://localhost:3000/api/notes/' + id, {
  //     title: newTitle,
  //     description: newDescription
  //   }).then(res => {
  //     fatchNotes();
  //   })
  // }


  function handleDelete(id) {
    console.log(id);
    axios.delete('https://backend-two-jet-85.vercel.app/api/notes/' + id)
      .then(res => {
        fatchNotes();
      })
  }

  return (
    <>

      <form className="note-create-form" onSubmit={handleSubmit}>
        <h2>Create Note</h2>
        <input name='title' type="text" placeholder='Title' />
        <textarea name='description' placeholder='Description'></textarea>
        <button className='create-note-btn'>Create Note</button>
      </form>
      <div className="notes">
        {
          notes.map((note) => {
            return <div className="note" key={note._id}>
              {editingNote===note._id ? (<>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />

        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />

        <button onClick={() => saveEdit(note._id)}>Save</button>
        <button onClick={() => setEditingNote(null)}>Cancel</button>
      </>):(
        <>
        <h2>{note.title}</h2>
        {/* <button className='note-actions'></button> */}
        <p>{note.description}</p>
        <button onClick={()=>{handleEditClick(note)}}>Edit</button>
        <button onClick={() => { handleDelete(note._id) }} >Delete</button>
        </>
      )}

            </div>
          })
        }
      </div>
    </>
  )
}

export default App
