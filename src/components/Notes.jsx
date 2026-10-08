import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function Notes() {
    const [notes, setNotes] = useState([]);
    const [showFinished, setShowFinished] = useState(true);
    const navigate = useNavigate();

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
    };

    const toggleFinished = () => {
        setShowFinished(!showFinished);
    };

    const handleDelete = (id) => {
        const newNotes = notes.filter(item => item.id !== id);
        setNotes(newNotes);
        saveToLS(newNotes);
    };

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = notes.findIndex(item => item.id == id);
        let newNotes = [...notes];
        newNotes[index].isCompleted = !newNotes[index].isCompleted;
        setNotes(newNotes);
        saveToLS(newNotes);
    };

    const handleEdit = (id) => {
        let t = notes.filter(i => i.id === id)[0];

        let newNotes = notes.filter(item => item.id !== id);
        setNotes(newNotes);
        saveToLS(newNotes);

        navigate('/', { state: { note: t.note, id: t.id } });
    };

    return (
        <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-green-100 min-h-[80vh] md:w-[35%] flex flex-col justify-between">
            <div>
                <div className='flex justify-between items-center p-2'>
                    <h2 className="text-2xl font-bold">Your Notes</h2>
                    <div>
                        <input type="checkbox" id="show" checked={showFinished} onChange={toggleFinished} />
                        <label className="mx-2" htmlFor="show">Show Finished</label>
                    </div>
                </div>

                <div className="notes mt-4">
                    {notes.length === 0 && <div className="m-5">No Notes to display.</div>}
                    {notes.map(item => (
                        (showFinished || !item.isCompleted) && (
                            <div key={item.id} className="note flex my-3 justify-between">
                                <div className="flex gap-5">
                                    <input
                                        name={item.id}
                                        onChange={handleCheckbox}
                                        type="checkbox"
                                        checked={item.isCompleted}
                                    />
                                    <div className={item.isCompleted ? "line-through" : ""}>{item.note}</div>
                                </div>
                                <div className="buttons flex h-full">
                                    <button onClick={() => handleEdit(item.id)} className="bg-green-600 hover:bg-green-700 p-2 py-1 font-bold text-sm text-white rounded-md mx-1">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="bg-green-600 hover:bg-green-700 p-2 py-1 font-bold text-sm text-white rounded-md mx-1">
                                        <AiFillDelete />
                                    </button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        </div>
    );
}

export default Notes;