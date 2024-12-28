import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoCard from "../components/TodoCard";
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

    for (let i = 0; i < todos.length; i++) {
        console.log("Todo: " + todos[i].priority);
    }

    if (loading) {
        return(<Loading/>);
    }

    return (
        <div className="todo-container">
            {todos.map( (item) => 
                <TodoCard key="{item._id}" todo={item}/>
            )}
        </div>
    );
};

export default Home;