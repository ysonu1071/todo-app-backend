const TodoModel = require("../models/todoModel");
const JWT = require("jsonwebtoken");


const getAllTodo = async (req, res) => {
    let user = req.verifiedToken;
    try {
        let allTodo = await TodoModel.find({ createdBy: user.id });
        return res.status(200).json({ status: 'success', message: "All todo fetched successfylly", data: allTodo, userName: user.name });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: "fail", message: error.message });
    }
}

const addTodo = async (req, res) => {
    // let token = req.cookies?.token;
    let todo = req.body.todo;

    try {
        let bearerToken = req.header("Authorization");
        let token = bearerToken.trim().split(" ")[1];
        
        let user = JWT.verify(token, process.env['SECRATE_KEY']);
        let addedTodo = await TodoModel.create({ todo, createdBy: user.id });

        return res.status(201).json({ status: "success", message: "Todo added successfully", data: addedTodo });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 'fail', message: error.message });
    }

}

const updateTodo = async (req, res) => {
    let { id, todo } = req.body;
    try {
        let updatedTodo = await TodoModel.findByIdAndUpdate({ _id: id }, { todo });

        return res.status(200).json({ status: "success", message: "Todo updated successfully" })

    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
}

const completeTodo = async (req, res) => {
    let { id, completed } = req.body;
    try {
        let completedTodo = await TodoModel.findByIdAndUpdate({ _id: id }, { completed: completed });
        if (completed) {
            return res.status(200).json({ status: "success", message: "Todo marked completed" })
        } else {
            return res.status(200).json({ status: "success", message: "Todo marked uncomplete" })
        }
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
}

const deleteTodo = async (req, res) => {
    let { id } = req.body;
    try {
        let deleteTodo = await TodoModel.findByIdAndDelete({ _id: id });

        return res.status(200).json({ status: "success", message: "Todo deleted successfully" })
    } catch (error) {
        return res.status(500).json({ status: "fail", message: error.message });
    }
}



module.exports = { getAllTodo, addTodo, updateTodo, completeTodo, deleteTodo };