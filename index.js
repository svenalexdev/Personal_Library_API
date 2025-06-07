import express from "express";
import "./db/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("*splat", (req, res) => {
    throw new Error("Not found", { cause: 404 });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
