import { z } from "zod/v4";

const userSchema = z.object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    email: z.email("Invalid email."),
});

const bookSchema = z.object({
    title: z.string().min(1, "Title is required."),
    author: z.string().min(1, "Author is required."),
    releaseYear: z
        .number()
        .int()
        .gte(1000, "Release year must be a 4-digit number.")
        .lte(9999, "Release year must be a 4-digit number."),
    // TBD how error message can be included in genre
    genre: z.enum([
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
    ]),
    isbn: z.union([
        z
            .string()
            .length(
                10,
                "ISBN needs to have either 10 or 13 digits, no dashes allowed."
            ),
        z
            .string()
            .length(
                13,
                "ISBN needs to have either 10 or 13 digits, no dashes allowed."
            ),
    ]),
});

export { userSchema, bookSchema };
