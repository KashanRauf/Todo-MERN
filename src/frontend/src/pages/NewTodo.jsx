import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const NewTodo = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completionDate, setCompletionDate] = useState(new Date());
    const [priority, setPriority] = useState("");
    const nav = useNavigate();

    const submit = () => {
        axios
            .post(`http://127.0.0.1:5555/todo/`, {"title": title, "description": description, 
            "completionDate": completionDate, "priority": priority})
            .then((response) => {
                console.log(response);
                nav("/todos");
            }).catch((error) => {
                console.error(error);
            });
    };

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
                    <input type="radio" name="priority" id="low" value="1" />
                    <label htmlFor="low">Low</label>
                    <input type="radio" name="priority" id="medium" value="2" />
                    <label htmlFor="medium">Medium</label>
                    <input type="radio" name="priority" id="high" value="3" />
                    <label htmlFor="high">High</label>
                </div>

                <button onClick={submit}>Create Todo</button>
            </div>
        </>
    );
};

export default NewTodo;