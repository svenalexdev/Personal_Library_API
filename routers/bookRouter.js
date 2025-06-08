import { Router } from "express";
import validateBody from "../middleware/validateBody.js";
import { bookSchema } from "../zod/schemas.js";
import {
    getBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
} from "../controllers/books.js";

const bookRouter = Router();

bookRouter.route("/").get(getBooks).post(validateBody(bookSchema), createBook);
bookRouter
    .route("/:id")
    .get(getBookById)
    .put(validateBody(bookSchema), updateBook)
    .delete(deleteBook);

export default bookRouter;
