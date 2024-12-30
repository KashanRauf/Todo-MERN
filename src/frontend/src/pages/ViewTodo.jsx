import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const ViewTodo = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [todo, setTodo] = useState({});

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5555/todo/${id}`)
            .then((response) => {
               console.log(response);
               setTodo(response.data); 
            }).catch((error) => {
                console.error(error);
            });
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Loading/>
        )
    }

    return (
        <>
            {/* Temporary back button */}
            <a href="http://localhost:5173/todos">Go back</a><br />

            <div className="view-todo-container">
                <p>ID: {todo._id}</p>
                <p>Title: {todo.title}</p>
                <p>Description: {todo.description}</p>
                <p>Completion Date: {todo.completionDate}</p>
                <p>Priority: {todo.priority}</p>
                <p>Completed: {todo.completed}</p>
                <p>Creation: {todo.createdAt}</p>
                <p>Last updated: {todo.updatedAt}</p>
            </div>
        </>
    );
};

export default ViewTodo;