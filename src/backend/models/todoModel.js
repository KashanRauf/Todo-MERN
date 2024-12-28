import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true // Required but if none entered use empty string
    },
    completionDate: {
        type: Date,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }},
    { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);