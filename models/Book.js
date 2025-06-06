import { Schema, model } from "mongoose";

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        author: {
            type: String,
            required: [true, "Author is required"],
        },
        releaseYear: {
            type: Number,
            required: [true, "Release year is required"],
        },
        genre: {
            type: String,
            enum: {
                values: [
                    "History",
                    "Science Fiction",
                    "Fantasy",
                    "Thriller",
                    "Romance",
                    "Comedy",
                    "Drama",
                    "Horror",
                    "Science",
                    "Travel",
                    "Other",
                ],
                message: "{VALUE} is not supported",
            },
            required: [true, "Genre is required"],
        },
        isbn: {
            type: String,
            required: [true, "ISBN is required"],
        },
    },
    { timestamps: true }
);

export default model("Book", bookSchema);
