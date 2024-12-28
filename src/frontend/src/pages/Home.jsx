import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoListItem from "../components/TodoListItem";
import Loading from "../components/Loading";

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get("http://127.0.0.1:5555/todo")
            .then(response => {
                setTodos(response.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false)
            });
    }, []);

    if (loading) {
        return(<Loading/>);
    }

    return (
        <ul className="todo-container">
            {todos.map( (item) => 
                <li><TodoListItem key="{item._id}" todo={item}/></li>
            )}
        </ul>
    );
};

export default Home;