import express from "express";
import "./db/index.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
