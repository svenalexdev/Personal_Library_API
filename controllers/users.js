import { isValidObjectId } from "mongoose";
import User from "../models/User.js";

export const getUsers = async (req, res) => {
    const users = await User.find().lean();
    res.json(users);
};

export const createUser = async (req, res) => {
    // Destructuring
    const {
        sanitizedBody: { email },
    } = req;

    const found = await User.findOne({ email });

    if (found) throw new Error("Email already exists", { cause: 400 });
    const user = await User.create(req.sanitizedBody);
    res.json(user);
};

export const getUserById = async (req, res) => {
    const {
        params: { id },
    } = req;


if (!isValidObjectId(id)) throw new Error('Invalid id', {cause: 400});

const user = await User.findById(id).lean().populate
};
