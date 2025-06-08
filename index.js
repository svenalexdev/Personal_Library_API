import express from "express";
import "./db/index.js";
import errorHandler from "./middleware/errorHandler.js";
import bookRouter from "./routers/bookRouter.js";
import userRouter from "./routers/userRouter.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/books", bookRouter);
app.use("/users", userRouter);

app.use("*splat", (req, res) => {
    throw new Error("Not found", { cause: 404 });
});

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
