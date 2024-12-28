import express from "express";
import { Todo } from "../models/todoModel.js";
import { printRequest } from "../index.js";

const router = express.Router();

// Routes here:
router.get("/", async (request, response) => {
    printRequest(request, "GET");
    try {
        const todos = await Todo.find({});
        return response.status(200).json({
            count: todos.length,
            data: todos,
        })
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: `Failed to get To-Dos: ${error.message}`});
    }
});

router.get("/:id", async (request, response) => {
    printRequest(request, "GET");
    try {
        const {id} = request.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return response.status(404).send({ message: `Todo with that id doesn't exist.`});
        }

        return response.status(200).send(todo);

    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: `Failed to get To-Do: ${error.message}`})
    }
});

router.post("/", async (request, response) => {
    printRequest(request, "POST");
    try {
        // Completion should be false by default, not something set by user

        if (!request.body.title || !request.body.completionDate || !request.body.priority || request.body.title.trim() == "" || request.body.completionDate == null || request.body.priority == null || request.body.priority == NaN) {
            return response.status(400).send({ message: "title, completionDate, and priority are required"});
        }

        var desc = " ";
        if (request.body.description) {
            desc = request.body.description;
        }

        const newTodo = {
            title: request.body.title,
            description: desc,
            completionDate: new Date(),
            priority: request.body.priority,
            completed: false
        };

        const todo = await Todo.create(newTodo);
        return response.status(201).send(todo);

    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: `Failed to create To-Do: ${error.message}`});
    }
});

router.put("/:id", async (request, response) => {
    printRequest(request, "PUT");
    try {
        const {id} = request.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return response.status(404).send({ message: `Todo with that id doesn't exist.`});
        }

        if (request.body.markCompletion != undefined) {
            todo.completed = request.body.markCompletion;
            await Todo.findByIdAndUpdate(id, todo);

            return response.status(200).send({ message: `Updated completion of todo with id: ${id} to ${todo.completed}`});
        }

        if ((request.body.title && request.body.title.trim() == "") || 
            (request.body.completionDate && request.body.completionDate == null) || 
            (request.body.priority && (request.body.priority == null || request.body.priority == NaN))) {
            return response.status(400).send({ message: "title, completionDate, or priority are invalid."});
        }
        var title = todo.title;
        var description = todo.description;
        var completionDate = todo.completionDate;
        var priority = todo.priority;

        if (request.body.title) {
            title = request.body.title;
        }
        if (request.body.description) {
            description = request.body.description;
        }
        if (request.body.completionDate) {
            completionDate = request.body.completionDate;
        }
        if (request.body.priority) {
            priority = request.body.priority;
        }

        const newTodo = {
            title: title,
            description: description,
            completionDate: completionDate,
            priority: priority,
            completed: todo.completed
        };

        await Todo.findByIdAndUpdate(id, newTodo);
        return response.status(200).send({ message: `Updated todo with id: ${id}`});
        
    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: `Failed to edit To-Do: ${error.message}`})
    }
});

router.delete("/:id", async (request, response) => {
    printRequest(request, "DELETE");
    try {
        const {id} = request.params;
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) {
            return response.status(404).send({ message: `Todo with that id doesn't exist.`});
        }

        return response.status(200).send({ message: `Deleted todo with id: ${id}`});

    } catch (error) {
        console.error(error);
        return response.status(500).send({ message: `Failed to delete To-Do: ${error.message}`})
    }
});

export default router;