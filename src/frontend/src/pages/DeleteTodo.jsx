import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const DeleteTodo = () => {
    const { id } = useParams();
    const nav = useNavigate();

    const deleteTodo = () => {
        axios
            .delete(`http://127.0.0.1:5555/todo/${id}`)
            .then((response) => {
                console.log(response)
                nav("/todos/");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <>
            {/* Temporary back button */}
            <a href="http://localhost:5173/">Go back</a><br/>
            <div>Would you like to delete this todo? Cannot be undone.</div>
            <button onClick={deleteTodo}>Delete</button>
        </>
    );
};

export default DeleteTodo;