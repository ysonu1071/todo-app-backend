const express = require("express");
const {getAllTodo, addTodo, updateTodo, deleteTodo, completeTodo} = require("../controller/todoController")
const authenticateUser = require('../middlewares/authenticateUser');

const route = express.Router();

route.get("/", authenticateUser, getAllTodo);
route.post("/add", addTodo);
route.post("/update", updateTodo);
route.post("/complete", completeTodo);
route.post("/delete", deleteTodo);

module.exports = route;