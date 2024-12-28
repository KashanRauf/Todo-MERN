import express from "express";
import { PORT, mongoURL } from "./config.js";
import  mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes.js";
import cors from "cors";

const time = new Date();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173"}));
app.use("/todo", todoRoutes);


app.get("/", (request, response) => {
    printRequest(request, "GET");
    return response.status(200).send(`
        <!DOCTYPE html>
        <html>
            <head><title>Default route</title></head>
            <body><h1 style="font-family: sans-serif">Default route</h1></body>
        </html>
    `);
});

mongoose.connect(mongoURL).then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    });
}).catch(() => {
    console.error(error);
});

export function printRequest(request, type) {
    console.log(`${type} "${request.url}" at ${time.toLocaleTimeString()}`);
}