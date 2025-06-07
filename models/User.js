import { Schema, model } from "mongoose";

const readingListSchema = new Schema({
    bookRefIf: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    status: {
        type: String,
        enum: ["read", "not read", "pending"],
        default: "pending",
    },
});

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, "First name is required"],
            minLength: [2, "Minimum length is 2 characters"],
            maxLength: 100,
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            minLength: [2, "Minimum length is 2 characters"],
            maxLength: 100,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        readingList: {
            type: [readingListSchema],
            default: () => [],
        },
    },
    { timestamps: true }
);

export default model("User", userSchema);
