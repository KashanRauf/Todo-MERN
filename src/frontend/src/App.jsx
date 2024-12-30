import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ViewTodo from "./pages/ViewTodo.jsx";
import NewTodo from "./pages/NewTodo.jsx";
import EditTodo from "./pages/EditTodo.jsx";
import DeleteTodo from "./pages/DeleteTodo.jsx";

// Priorities: 1=Low, 2=Medium, 3=High
export function priorityLevel(todo) {
    const val = todo.priority;

    if (val <= 1) return "Low";
    if (val == 2) return "Medium";
    if (val >= 3) return "High";
}

const App = () => {
    return (
        <Routes>
            <Route path="/todos/" element={<Home />} />
            <Route path="/todos/details/:id" element={<ViewTodo />} />
            <Route path="/todos/new" element={<NewTodo />} />
            <Route path="/todos/edit/:id" element={<EditTodo />} />
            <Route path="/todos/delete/:id" element={<DeleteTodo />} />
        </Routes>
    );
};

export default App;