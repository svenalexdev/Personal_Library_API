import { isValidObjectId } from "mongoose";
import User from "../models/User.js";

const getUsers = async (req, res) => {
    const users = await User.find().lean();
    res.json(users);
};

const createUser = async (req, res) => {
    // Destructuring
    const { email } = req.sanitizedBody;

    const found = await User.findOne({ email });

    if (found) throw new Error("Email already exists", { cause: 400 });
    const user = await User.create(req.sanitizedBody);
    res.status(201).json(user);
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });

    const user = await User.findById(id)
        .lean()
        .populate("readingList.bookRefId");

    if (!user) throw new Error("User not found", { cause: 404 });

    res.json(user);
};

const updateUser = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });

    const user = await User.findByIdAndUpdate(id, req.sanitizedBody, {
        new: true,
    });

    if (!user) throw new Error("User not found", { cause: 404 });

    res.json(user);
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });
    const user = await User.findByIdAndDelete(id);

    if (!user) throw new Error("User not found", { cause: 404 });

    res.status(200).json({ message: "User deleted" });
};

const addBookToList = async (req, res) => {
    const { id } = req.params;
    const { bookRefId } = req.sanitizedBody;

    if (!isValidObjectId(id) || !isValidObjectId(bookRefId))
        throw new Error("Invalid id", { cause: 400 });
    const user = await User.findById(id);

    if (!user) throw new Error("User not found", { cause: 404 });

    user.readingList.push(req.sanitizedBody);
    await user.save();

    const userWithList = await user.populate("readingList.bookRefId");

    res.json(userWithList);
};

const updateBookInList = async (req, res) => {
    const { id, bookId } = req.params;
    const { status } = req.sanitizedBody;

    if (!isValidObjectId(id) || !isValidObjectId(bookId))
        throw new Error("Invalid id", { cause: 400 });

    const user = await User.findById(id);

    if (!user) throw new Error("User not found", { cause: 404 });

    const book = await user.readingList.id(bookId);

    if (!book) throw new Error("Book not found", { cause: 404 });

    console.log(status);

    book.status = status;
    await user.save();

    const userWithList = await user.populate("readingList.bookRefId");
    res.json(userWithList);
};

const removeBookFromList = async (req, res) => {
    const { id, bookId } = req.params;

    if (!isValidObjectId(id) || !isValidObjectId(bookId))
        throw new Error("Invalid id", { cause: 400 });

    const user = await User.findById(id);

    if (!user) throw new Error("User not found", { cause: 404 });

    const book = await user.readingList.id(bookId);

    if (!book) throw new Error("Book not found", { cause: 404 });

    book.deleteOne();
    await user.save();

    res.json(user);
};

export {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addBookToList,
    updateBookInList,
    removeBookFromList,
};
