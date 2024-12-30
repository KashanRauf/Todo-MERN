import axios from "axios";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { priorityLevel } from "../App";

const TodoListItem = ({ todo }) => {
    const priority = priorityLevel(todo);
    const date = new Date(todo.completionDate)
    const [checked, setChecked] = useState(todo.completed);

    const markComplete = () => {
        console.log(`http://127.0.0.1:5555/todo/${todo._id}`);
        // Set to terminate without changing if there's an error
        axios
        .put(`http://127.0.0.1:5555/todo/${todo._id}`, {"markCompletion": !checked})
        .then((response) => {
            console.log(response);
        }).catch((error) => {
            console.error(error);
            return;
        });
        setChecked(!checked);
        
    };

    // Title, desc, priority, completion date, status, edit and delete
    return (
        <div className="todo-list-item">
            <div className="main-info">
                <div>
                    <input id="completion" onChange={markComplete} type="checkbox" checked={checked}></input>
                    <label htmlFor="completion" className="todo-title">{todo.title}</label>
                </div>
                <p className={`priority-level ${priority?.toLowerCase()}-priority`}>{priority}</p>
            </div>
            <p className="todo-desc">{todo.description}</p>
            <p className="todo-date">{date.toLocaleDateString(undefined, {day: "numeric", month: "long", year: "numeric"})}</p>
            <div className="options">
                <Link to={`/todos/details/${todo._id}`}>
                    <BsInfoCircle className="bsinfocircle"/>
                </Link>
                <Link to={`/todos/edit/${todo._id}`}>
                    <AiOutlineEdit className="aioutlineedit"/>
                </Link>
                <Link to={`/todos/delete/${todo._id}`}>
                    <MdOutlineDelete className="mdoutlinedelete"/>
                </Link>
            </div>
        </div>
    );

    // return (
    //     <div className="todo-card">
    //     {/*Make the priority sm else and use this in bottom right for completion?*/}
    //         <p className={`priority-level ${priority?.toLowerCase()}-priority`}>{priority}</p>

    //     </div>
    // );
};

export default TodoListItem;