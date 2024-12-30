import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import DatePicker from "react-datepicker";

const EditTodo = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completionDate, setCompletionDate] = useState("");
    const [priority, setPriority] = useState("");
    const nav = useNavigate();

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5555/todo/${id}`)
            .then((response) => {
                const t = response.data;
                setTitle(t.title);
                setDescription(t.description);
                setCompletionDate(new Date(t.completionDate));
                setPriority(t.priority);
                setLoading(false);
            }).catch((error) => {
                console.error(error);
                setLoading(false);
                nav("/todos");
            });
    }, []);

    const edit = () => {
        axios
            .put(`http://127.0.0.1:5555/todo/${id}`, {"title": title, "description": description, 
                "completionDate": completionDate, "priority": priority})
            .then((response) => {
                console.log(response);
                nav("/todos");
            }).catch((error) => {
                console.error(error);
            });
    };

    if (loading) {
        return (
            <div>
                {/* Temporary back button */}
                <a href="http://localhost:5173/">Go back</a><br />
                <Loading />
            </div>
        );
    }

    return (
        <>
            {/* Temporary back button */}
            <a href="http://localhost:5173/todos">Go back</a><br />

            <div className="todo-input">
                <div>
                    <p>Title</p>
                    <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <p>Description</p>
                    <textarea id="desc" name="description" rows="5" cols="50" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <p>Completion Date</p>
                    <DatePicker selected={completionDate} onChange={(date) => setCompletionDate(date)} />
                </div>
                <div onChange={(e) => { setPriority(e.target.value) }}>
                    <p>Priority</p>
                    <input type="radio" name="priority" id="low" value="1" checked={priority <= 1} onChange={() => {}}/>
                    <label htmlFor="low">Low</label>
                    <input type="radio" name="priority" id="medium" value="2" checked={priority == 2} onChange={() => {}}/>
                    <label htmlFor="medium">Medium</label>
                    <input type="radio" name="priority" id="high" value="3" checked={priority >= 3} onChange={() => {}}/>
                    <label htmlFor="high">High</label>
                </div>

                <button onClick={edit}>Confirm changes</button>
            </div>
        </>
    );
};

export default EditTodo;