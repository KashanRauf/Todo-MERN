import React from "react";
import { priorityLevel } from "../App";

const TodoCard = ({ todo }) => {
    const priority = priorityLevel(todo);

    return (
        <div className="todo-card">
            <h1 className="todo-title">{todo.title}</h1>
            <p className="todo-desc">{todo.description}</p>
            <p className=""></p>
        </div>
    );

    // return (
    //     <div className="todo-card">
    //     {/*Make the priority sm else and use this in bottom right for completion?*/}
    //         <p className={`priority-level ${priority?.toLowerCase()}-priority`}>{priority}</p>

    //     </div>
    // );
};

export default TodoCard;