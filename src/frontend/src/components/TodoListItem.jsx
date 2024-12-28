import React, { useEffect, useState } from "react";
import { priorityLevel } from "../App";
import axios from "axios";

const TodoListItem = ({ todo }) => {
    const priority = priorityLevel(todo);
    const date = new Date(todo.completionDate)
    const [checked, setChecked] = useState(todo.completed);

    const markComplete = () => {
        setChecked(!checked);
        console.log(`http://127.0.0.1:5555/todo/${todo._id}`);
        axios
            .put(`http://127.0.0.1:5555/todo/${todo._id}`, {"markCompletion": !checked})
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
            });
        
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
            <p className="todo-date">{date.toLocaleDateString()}</p>

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