import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useLocation } from 'react-router-dom';

function Home() {
    const [note, setNote] = useState("");
    const [notes, setNotes] = useState([]);
    const [showFinished, setshowFinished] = useState(true); 
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setNote(location.state.note);
        }
    }, [location.state]);


    useEffect(() => {
        let noteString = localStorage.getItem("notes");
        if (noteString) {
            try {
                let notes = JSON.parse(noteString);
                setNotes(notes);
            } catch (e) {
                console.error("Failed to parse notes from localStorage", e);
                setNotes([]);
            }
        }
    }, []);


    const saveToLS = (newNotes) => {
        localStorage.setItem("notes", JSON.stringify(newNotes));
    }

    const toggleFinished = () => {
        setshowFinished(!showFinished)
    }

    const handleEdit = (e, id) => {
        let t = notes.filter(i => i.id === id);
        setNote(t[0].note);
        let newNotes = notes.filter(item => {
            return item.id !== id
        });
        setNotes(newNotes);
        saveToLS(newNotes);
    }

    const handleDelete = (e, id) => {
        const newNotes = notes.filter(item => item.id !== id);
        setNotes(newNotes);
        saveToLS(newNotes);
    }


    const handleAdd = () => {
        const newNotes = [...notes, { id: uuidv4(), note, isCompleted: false }];
        setNotes([...notes, { id: uuidv4(), note, isCompleted: false }])
        setNote("")
        saveToLS(newNotes);
    }

    const handleChange = (e) => {
        setNote(e.target.value)
    }

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = notes.findIndex(item => {
            return item.id == id;
        })
        let newNotes = [...notes];
        newNotes[index].isCompleted = !newNotes[index].isCompleted;
        setNotes(newNotes);
        saveToLS(newNotes);
    }

    return (
        <>
            <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-green-100 min-h-[90vh]">
                <h1 className='font-bold text-center text-3xl'>Notes App</h1>
                <div className="addNote my-5 flex flex-col gap-3">
                    <h2 className='text-2xl font-bold'>Add a Note</h2>
                    <div className="flex">
                        <input onChange={handleChange} value={note} type="text" className='w-full rounded-full px-4 py-1 outline' />
                        <button onClick={handleAdd} className='bg-green-600 hover:bg-green-700 p-2 font-bold text-sm text-white rounded-full disabled:bg-green-500 mx-2 w-1/4' disabled={note.length < 1} >Add Note</button>
                    </div>
                </div>
                <input type="checkbox" className='my-4' id='show' checked={showFinished} onChange={toggleFinished} />
                <label className='mx-2' htmlFor="show">Show Finished</label>
                <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
                <h2 className='text-2xl font-bold'>Your Notes</h2>
                <div className="notes">
                    {notes.length === 0 && <div className='m-5'>No Notes to display.</div>}
                    {notes.map(item => {
                        return (showFinished || !item.isCompleted) && <div key={item.id} className="note flex my-3 justify-between">
                            <div className='flex gap-5'>
                                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                                <div className={item.isCompleted ? "line-through" : ""}> {item.note} </div>
                            </div>
                            <div className="buttons flex h-full">
                                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-green-600 hover:bg-green-700 p-2 py-1 font-bold text-sm text-white rounded-md mx-1'><FaEdit /></button>
                                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-green-600 hover:bg-green-700 p-2 py-1 font-bold text-sm text-white rounded-md mx-1'><AiFillDelete /></button>
                            </div>
                        </div>
                    })}

                </div>
            </div>
        </>
    )
}

export default Home
