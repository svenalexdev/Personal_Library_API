import { Schema, model } from "mongoose";

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            minLength: [1, "Minimum length is 1 character"],
            maxLength: 255,
        },
        author: {
            type: String,
            required: [true, "Author is required"],
        },
        releaseYear: {
            type: Number,
            required: [true, "Release year is required"],
            min: [1000, "Release year must be a 4-digit number."],
            max: [9999, "Release year must be a 4-digit number."],
        },
        genre: {
            type: String,
            enum: [
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
            required: [true, "Genre is required"],
        },
        isbn: {
            type: String,
            required: [true, "ISBN is required"],
            unique: true,
            validate: {
                validator: (v) =>
                    /^[0-9]{10}$/.test(v) || /^[0-9]{13}$/.test(v),
                message:
                    "ISBN needs to have either 10 or 13 digits, no dashes allowed.",
            },
        },
    },
    { timestamps: true }
);

export default model("Book", bookSchema);
